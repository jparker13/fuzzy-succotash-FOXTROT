// Imports
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
import React from "https://esm.sh/react@18.2.0";

function AnimatedBackground({ interval = 100 }) {
    let prevTime;
    const ref = React.useRef(null);

    function getRandomSpawnLocation() {
        const spawnLocationX = Math.round(
            Math.random() * ref.current.parentElement.scrollWidth - 80
        );
        const spawnLocationY = Math.round(
            Math.random() * ref.current.parentElement.scrollHeight - 80
        );
        return [spawnLocationX + "px", spawnLocationY + "px"];
    }

    function animate(timestamp) {
        if (prevTime === undefined) {
            prevTime = timestamp;
        }
        if (timestamp - prevTime > interval) {
            const particle = document.createElement("div");
            particle.classList.add("sparkle");
            particle.onanimationend = () => particle.remove();
            [
                particle.style.left,
                particle.style.top
            ] = getRandomSpawnLocation();
            ref.current.append(particle);
            prevTime = timestamp;
        }
        window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);

    return <div ref={ref} className="bg"></div>;
}

// Usage
function Home() {
    return (
        <div style={{ "min-height": "100vh" }}>
            <AnimatedBackground />
        </div>
    );
}

// Setup
const root = createRoot(document.getElementById("root"));

root.render(<Home />);