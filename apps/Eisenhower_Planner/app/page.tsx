'use client';

import { useEffect, useState, useRef } from 'react';
import { ensureAuth } from '@/lib/supabase';
import { loadTasks, saveTasks, loadChannels, saveChannels, Task } from '@/lib/db';
import './page.css';

export default function EisenhowerPlanner() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [channels, setChannels] = useState<Record<string, string>>({ c1: 'Channel 1', c2: 'Channel 2', c3: 'Channel 3' });
  const [userId, setUserId] = useState<string | null>(null);
  const [newTaskText, setNewTaskText] = useState('');
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const init = async () => {
      try {
        const uid = await ensureAuth();
        setUserId(uid);
        const loaded = await loadTasks(uid);
        const chs = await loadChannels(uid);
        setTasks(loaded);
        setChannels(chs);
      } catch (err) {
        console.error('Init error:', err);
      }
    };
    init();
  }, []);

  const saveToDb = (updated: Task[]) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (userId) {
        await saveTasks(userId, updated);
      }
    }, 500);
  };

  const addTask = () => {
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      text: newTaskText,
      q: 'inbox',
      done: false,
      createdAt: Date.now(),
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    setNewTaskText('');
    saveToDb(updated);
  };

  const moveTask = (taskId: string, newQuadrant: string) => {
    const updated = tasks.map(t =>
      t.id === taskId ? { ...t, q: newQuadrant as Task['q'] } : t
    );
    setTasks(updated);
    saveToDb(updated);
  };

  const completeTask = (taskId: string) => {
    const updated = tasks.map(t =>
      t.id === taskId ? { ...t, done: !t.done } : t
    );
    setTasks(updated);
    saveToDb(updated);
  };

  const deleteTask = (taskId: string) => {
    const updated = tasks.filter(t => t.id !== taskId);
    setTasks(updated);
    saveToDb(updated);
  };

  const updateChannelLabel = (slot: string, label: string) => {
    const updated = { ...channels, [slot]: label };
    setChannels(updated);
    if (userId) {
      saveChannels(userId, updated);
    }
  };

  const inbox = tasks.filter(t => t.q === 'inbox' && !t.done);
  const q1 = tasks.filter(t => t.q === 'q1' && !t.done);
  const q2 = {
    c1: tasks.filter(t => t.q === 'q2c1' && !t.done),
    c2: tasks.filter(t => t.q === 'q2c2' && !t.done),
    c3: tasks.filter(t => t.q === 'q2c3' && !t.done),
  };
  const q3 = tasks.filter(t => t.q === 'q3' && !t.done);
  const q4 = tasks.filter(t => t.q === 'q4' && !t.done);
  const completed = tasks.filter(t => t.done).reverse();

  return (
    <div className="wrap">
      {/* Header */}
      <div className="masthead">
        <div className="cal">
          <div className="mo">{new Date().toLocaleString('default', { month: 'short' })}</div>
          <div className="yr">{new Date().getFullYear()}</div>
        </div>
        <div className="sub">Eisenhower Planner</div>
      </div>

      {/* Add Task Bar */}
      <div className="addbar">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTaskText}
          onChange={e => setNewTaskText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
        />
        <button className="btn dark" onClick={addTask}>Add</button>
      </div>

      {/* Inbox */}
      {inbox.length > 0 && (
        <div className="inbox-section">
          <div className="secthead">Inbox ({inbox.length})</div>
          <div className="inbox">
            {inbox.length === 0 ? (
              <div className="empty">Empty!</div>
            ) : (
              <div className="chips">
                {inbox.map(t => (
                  <div key={t.id} className="task-chip" draggable onDragStart={() => setDraggedTask(t)}>
                    <input type="checkbox" onChange={() => completeTask(t.id)} />
                    <span>{t.text}</span>
                    <button onClick={() => deleteTask(t.id)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Eisenhower Matrix */}
      <div className="secthead">This Week</div>
      <div className="matrix">
        {/* Q1: Do (Urgent & Important) */}
        <div
          className="quadrant q1"
          onDragOver={e => e.preventDefault()}
          onDrop={() => draggedTask && moveTask(draggedTask.id, 'q1')}
        >
          <h3>Do</h3>
          <p className="quad-sub">Urgent & Important</p>
          {q1.map(t => (
            <div key={t.id} className="task" draggable onDragStart={() => setDraggedTask(t)}>
              <input type="checkbox" onChange={() => completeTask(t.id)} />
              <span>{t.text}</span>
              <button onClick={() => deleteTask(t.id)}>×</button>
            </div>
          ))}
        </div>

        {/* Q2: Schedule (Not Urgent & Important) */}
        <div className="quadrant q2">
          <h3>Schedule</h3>
          <p className="quad-sub">Not Urgent & Important</p>
          {[1, 2, 3].map(slot => (
            <div key={`q2c${slot}`} className="channel">
              <input
                type="text"
                className="channel-label"
                value={channels[`c${slot}`]}
                onChange={e => updateChannelLabel(`c${slot}`, e.target.value)}
                placeholder={`Channel ${slot}`}
              />
              <div
                onDragOver={e => e.preventDefault()}
                onDrop={() => draggedTask && moveTask(draggedTask.id, `q2c${slot}`)}
              >
                {q2[`c${slot}`].map(t => (
                  <div key={t.id} className="task" draggable onDragStart={() => setDraggedTask(t)}>
                    <input type="checkbox" onChange={() => completeTask(t.id)} />
                    <span>{t.text}</span>
                    <button onClick={() => deleteTask(t.id)}>×</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Q3: Delegate (Urgent & Not Important) */}
        <div
          className="quadrant q3"
          onDragOver={e => e.preventDefault()}
          onDrop={() => draggedTask && moveTask(draggedTask.id, 'q3')}
        >
          <h3>Delegate</h3>
          <p className="quad-sub">Urgent & Not Important</p>
          {q3.map(t => (
            <div key={t.id} className="task" draggable onDragStart={() => setDraggedTask(t)}>
              <input type="checkbox" onChange={() => completeTask(t.id)} />
              <span>{t.text}</span>
              <button onClick={() => deleteTask(t.id)}>×</button>
            </div>
          ))}
        </div>

        {/* Q4: Drop (Not Urgent & Not Important) */}
        <div
          className="quadrant q4"
          onDragOver={e => e.preventDefault()}
          onDrop={() => draggedTask && moveTask(draggedTask.id, 'q4')}
        >
          <h3>Drop</h3>
          <p className="quad-sub">Not Urgent & Not Important</p>
          {q4.map(t => (
            <div key={t.id} className="task" draggable onDragStart={() => setDraggedTask(t)}>
              <input type="checkbox" onChange={() => completeTask(t.id)} />
              <span>{t.text}</span>
              <button onClick={() => deleteTask(t.id)}>×</button>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Tasks */}
      {completed.length > 0 && (
        <div className="completed-section">
          <div className="secthead">Completed ({completed.length})</div>
          <div className="completed-list">
            {completed.slice(0, 10).map(t => (
              <div key={t.id} className="completed-task">
                <span className="checkmark">✓</span>
                <span className="text">{t.text}</span>
                <button onClick={() => deleteTask(t.id)}>×</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
