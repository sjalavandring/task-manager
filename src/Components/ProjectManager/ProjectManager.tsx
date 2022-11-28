import React from "react";
import {NavLink} from "react-router-dom";

function ProjectManager () {
    return (
        <div className="project-manager wrapper">
            <h1 className="project-manager-title">Менеджер проектов</h1>
            <div className="project-list">
                <NavLink to={'/project'} className="project-list-item">Проект 1</NavLink>      
            </div>
        </div>
    )
}

export default ProjectManager