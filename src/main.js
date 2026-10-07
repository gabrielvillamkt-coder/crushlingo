import './styles.css';
import lessons from '../data/lessons.json';
import { renderHome } from './screens/home.js';
import { renderLesson } from './screens/lesson.js';
import { renderResult } from './screens/result.js';

const app = document.getElementById('app');

const nav = {
  home: () => renderHome(app, lessons, nav),
  lesson: (lesson) => renderLesson(app, lesson, nav),
  result: (data) => renderResult(app, data, nav),
};

nav.home();
