// src/components/HiddenEditor/ChatSidebar.jsx
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";

/**
 * ChatSidebar
 * Un panneau de chat fixé à droite qui affiche le texte en Markdown.
 * Le prop `context` est la description ou métadonnées du POI sélectionné.
 */
export default function ChatSidebar({ context }) {
    const [messages, setMessages] = useState([
        {
            from: "bot",
            text: "Bienvenue ! Posez-moi vos questions.\n\nVous pouvez **souligner** ou __mettre en gras__ du texte, faire des listes, etc.",
        },
    ]);
    const [input, setInput] = useState("");
    const endRef = useRef(null);

    // Scroll automatique vers le bas
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        const text = input.trim();
        if (!text) return;
        setMessages(msgs => [...msgs, { from: "user", text }]);
        setInput("");

        try {
            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "nvidia/llama-3.3-nemotron-super-49b-v1:free",
                    messages: [
                        {
                            role: "system",
                            content: `Vous êtes un assistant IA. Contexte : ${
                                context || "aucun POI sélectionné"
                            }`,
                        },
                        ...messages.map(m => ({
                            role: m.from === "user" ? "user" : "assistant",
                            content: m.text,
                        })),
                        { role: "user", content: text },
                    ],
                }),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const botReply = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas compris.";
            setMessages(msgs => [...msgs, { from: "bot", text: botReply }]);
        } catch (e) {
            console.error("[Chat] erreur fetch:", e);
            setMessages(msgs => [
                ...msgs,
                { from: "bot", text: "❌ **Erreur serveur**, réessayez dans un instant." },
            ]);
        }
    };

    return (
        <div className="fixed right-0 top-0 h-full w-80 bg-white border-l shadow-lg flex flex-col">
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Assistant POI</h2>
                <p className="text-sm text-gray-500 truncate">
                    Contexte : <strong>{context || "aucun POI sélectionné"}</strong>
                </p>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-3">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`p-2 rounded-lg max-w-[75%] break-words ${
                            m.from === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"
                        }`}
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                                u: ({ node, ...props }) => <u {...props} />,
                                li: ({ node, ...props }) => <li className="ml-4 list-disc" {...props} />,
                            }}
                        >
                            {m.text}
                        </ReactMarkdown>
                    </div>
                ))}
                <div ref={endRef} />
            </div>

            <div className="p-3 border-t flex">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-l-lg focus:ring focus:ring-blue-200"
                    placeholder="Votre message…"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                />
                <Button onClick={sendMessage} className="rounded-r-lg">
                    Envoyer
                </Button>
            </div>
        </div>
    );
}
