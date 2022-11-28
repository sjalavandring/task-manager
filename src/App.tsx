import React from 'react';
import './App.scss';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import ProjectManager from './Components/ProjectManager/ProjectManager';
import TaskManager from './Components/TaskManager/TaskManager';


function App() {
  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ProjectManager/>} />
            <Route path='project' element={<TaskManager/>} />
          </Routes>
        </BrowserRouter>
      </DndProvider>
    </main>
  );
}

export default App;
