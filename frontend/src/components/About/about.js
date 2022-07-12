import React from 'react'
import {
  faAngular,
  faCss3,
  faGitAlt,
  faHtml5,
  faJsSquare,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './about.css'
import Header from '../headerComponent/header'

const About = () => {
  return (
    <>
    <Header/>
      <div className="about-container about-page">
        <div className="text-zone">
          <h1>
            About me
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem temporibus amet impedit! Obcaecati nisi iusto recusandae? Tempora voluptas, ex, voluptatibus excepturi repudiandae ratione vero esse voluptates necessitatibus possimus molestiae beatae quos pariatur ipsa sint!
          </p>
          <p align="LEFT">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis adipisci corporis velit quam unde praesentium exercitationem vitae reprehenderit vero illum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas eius quam, nostrum atque, rem eligendi provident fugit, perspiciatis impedit optio cum consequuntur corporis?
          </p>
        </div>

        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
              <FontAwesomeIcon icon={faAngular} color="#DD0031" />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faHtml5} color="#F06529" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faCss3} color="#28A4D9" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faGitAlt} color="#EC4D28" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
