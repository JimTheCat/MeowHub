import React, {useEffect} from "react";
import {loadFull} from "tsparticles";
import {useColorScheme} from "@mantine/hooks";
import type {Container, Engine, IOptions} from "@tsparticles/engine";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import kitty_light from "./assets/kitty_light.svg";
import kitty_dark from "./assets/kitty_dark.svg";

export const ParticleBg = React.memo(() => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then((r => console.log(r)));
  }, []);

  const options: any = {
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: false,
          mode: "push",
        },
        onHover: {
          enable: false,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    fullScreen: {
      enable: true,
      zIndex: -5,
    },
    particles: {
      color: {
        value: colorScheme === 'dark' ? "#ffffff" : "#000000"
      },
      links: {
        color: colorScheme === 'dark' ? "#ffffff" : "#000000",
        distance: 80,
        enable: true,
        opacity: 0.6,
        width: 0.5,
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: "random",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: {min: 1, max: 2},
        straight: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
        vibrate: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 70,
      },
      opacity: {
        value: 0.4,
      },
      rotate: {
        value: {min: 0, max: 360},
        animation: {
          enable: true,
          speed: 7,
          sync: false,
        },
        direction: "random",
      },
      shape: {
        type: "image",
        options: {
          image: {
            src: colorScheme === 'dark' ? kitty_dark : kitty_light,
            width: 32,
            height: 32,
          },
        },
      },
      size: {
        value: {min: 12, max: 25},
      },
    },
    detectRetina: true,
  };

  const particlesLoaded = async (container: Container | undefined) => {
    console.log(container);
  };

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options as IOptions}/>;
});
