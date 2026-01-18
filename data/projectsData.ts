interface Project {
  title: string;
  description: string;
  href: string;
  imgSrc: string;
  playable?: boolean;
}

const projectsData: Project[] = [
  {
    title: "Chess Game",
    description: `A chess game designed for both mobile and desktop browsers, written completely from scratch with React, TypeScript, 
    and TailwindCSS. Incorporates Stockfish AI, allowing players to either challenge the AI across various difficulty levels or 
    utilize it for in-depth, continuous game analysis.`,
    imgSrc: "/assets/images/react_chess_sf.png",
    href: "/projects/chess",
    playable: true,
  },
  {
    title: "Terminal SSH Session Manager",
    description: `A terminal-based SSH session manager written in Go using the Bubble Tea TUI framework.  Allows users to easily manage 
    and connect to multiple SSH/telnet sessions from a single interface. Also allows editing/adding/removing hosts from their config files 
    directly through the interface.  Inspired by PuTTY, I wanted to create a better looking and more useful tool for managing my own SSH/telnet connections at work.`,
    imgSrc: "/assets/images/terminal-ssh-manager.png",
    href: "https://github.com/MichaelJOHare/bubbletea-ssh-manager",
    playable: false,
  },
  {
    title: "Chrome Dino Game Clone",
    description: `A clone of the classic Chrome Dino Game, written using HTML5 Canvas and JavaScript.  Built to better learn how to use canvas 
    as well as to experiment with browser-based game development.`,
    imgSrc: "/assets/images/dino_game.png",
    href: "/projects/dino-game",
    playable: true,
  },
  {
    title: "Java Chess",
    description: `A chess game designed for desktop use, written in Java.  Utilizes the Swing library for the GUI and incorporates Stockfish 
    AI.  Built during my time in Tech Elevator's coding bootcamp to better understand Java and object-oriented programming.`,
    imgSrc: "/assets/images/java_chess.png",
    href: "https://github.com/MichaelJOHare/chess-application2.0",
    playable: false,
  },
  {
    title: "Cube-three.js",
    description: "A rotating cube... that is all.",
    imgSrc: "/assets/images/cube.png",
    href: "/projects/cube",
    playable: true,
  },
];

export default projectsData;
