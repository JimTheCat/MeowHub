import React, {useCallback} from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import {loadFull} from "tsparticles";

export const ParticleBg = () => {

  const customInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const options: any = {
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: false,
          mode: "push"
        },
        onHover: {
          enable: false,
          mode: "repulse"
        },
        resize: true
      },
      modes: {
        push: {
          quantity: 4
        },
        repulse: {
          distance: 200,
          duration: 0.4
        }
      }
    },
    fullScreen: {
      enable: true,
      zIndex: -5
    },
    particles: {
      color: {
        value: "#ffffff"
      },
      links: {
        color: "#ffffff",
        distance: 60,
        enable: true,
        opacity: 0.6,
        width: .3
      },
      collisions: {
        enable: true
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce"
        },
        random: true,
        speed: .7,
        straight: false
      },
      number: {
        density: {
          enable: true,
          area: 800
        },
        value: 80
      },
      opacity: {
        value: 0.3
      },
      shape: {
        type: "circle"
      },
      size: {
        value: { min: 1, max: 5 }
      }
    },
    detectRetina: true
  };

  return <Particles options={options} init={customInit}/>;
}