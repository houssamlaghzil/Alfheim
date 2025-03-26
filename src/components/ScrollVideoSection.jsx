import React, { useRef, useState, useEffect } from "react";

function ScrollVideoSection() {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const [videoDuration, setVideoDuration] = useState(0);
    const [showButton, setShowButton] = useState(false);

    // Au chargement des métadonnées, récupère la durée de la vidéo
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setVideoDuration(videoRef.current.duration);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !videoRef.current) return;

            const windowHeight = window.innerHeight;
            const sectionHeight = sectionRef.current.offsetHeight;
            const sectionTop = sectionRef.current.offsetTop;

            // Calcul de la progression de scroll relative à la section
            const scrollY = window.scrollY - sectionTop;
            const maxScroll = sectionHeight - windowHeight;
            const scrollClamped = Math.min(Math.max(scrollY, 0), maxScroll);
            const scrollFraction = scrollClamped / maxScroll;

            // Mise à jour du temps de lecture de la vidéo
            if (videoDuration > 0) {
                videoRef.current.currentTime = scrollFraction * videoDuration;
            }

            // Affichage du bouton dès que le scroll atteint (ou dépasse) 99%
            if (scrollFraction >= 0.99) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [videoDuration]);

    return (
        <section
            ref={sectionRef}
            style={{ height: 20000 }} // Hauteur de la section pour permettre le scroll
            className="relative w-full"
        >
            <div className="sticky top-0 h-screen w-full">
                <video
                    ref={videoRef}
                    onLoadedMetadata={handleLoadedMetadata}
                    src="src/assets/videos/coloré flat plat illustratif annonce teasing vidéo.mp4" // Ajustez le chemin vers votre vidéo
                    className="w-full h-full object-cover pointer-events-none"
                    controls={false}
                    muted
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    onContextMenu={(e) => e.preventDefault()}
                />
                {showButton && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg shadow-lg">
                            Inscrivez-vous et soyez les premiers à tester ALFHEIM
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ScrollVideoSection;
