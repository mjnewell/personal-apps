import { supabase } from './supabase';

export interface Task {
  id: string;
  text: string;
  q: 'inbox' | 'q1' | 'q2c1' | 'q2c2' | 'q2c3' | 'q3' | 'q4';
  month?: number;
  year?: number;
  week?: number;
  wrank?: number;
  done: boolean;
  createdAt: number;
  completedAt?: number;
}

function rowToTask(r: any): Task {
  return {
    id: r.id,
    text: r.text,
    q: r.quadrant === 'q2' ? ('q2c' + (r.channel || 1)) : r.quadrant,
    month: r.sched_month,
    year: r.sched_year,
    week: r.week,
    wrank: r.week_rank,
    done: r.done,
    createdAt: r.created_at ? Date.parse(r.created_at) : Date.now(),
    completedAt: r.completed_at ? Date.parse(r.completed_at) : undefined,
  };
}

function taskToRow(t: Task, userId: string, orderIndex: number) {
  const isCh = typeof t.q === 'string' && t.q.startsWith('q2c');
  return {
    id: t.id,
    user_id: userId,
    text: t.text,
    quadrant: isCh ? 'q2' : t.q,
    channel: isCh ? Number(t.q.slice(3)) : null,
    sched_month: t.month || null,
    sched_year: t.year || null,
    week: t.week || null,
    week_rank: t.wrank ?? null,
    matrix_rank: orderIndex,
    done: !!t.done,
    completed_at: t.completedAt ? new Date(t.completedAt).toISOString() : null,
  };
}

export async function loadTasks(userId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('matrix_rank', { ascending: true });
  
  if (error) {
    console.error('loadTasks error:', error);
    return [];
  }
  
  return (data || []).map(rowToTask);
}

export async function saveTasks(userId: string, tasks: Task[]): Promise<void> {
  const rows = tasks.map((t, i) => taskToRow(t, userId, i));
  
  if (rows.length) {
    const { error } = await supabase.from('tasks').upsert(rows);
    if (error) console.error('saveTasks upsert error:', error);
  }
  
  const ids = tasks.map(t => t.id);
  let deleteQuery = supabase.from('tasks').delete().eq('user_id', userId);
  
  if (ids.length) {
    deleteQuery = deleteQuery.not('id', 'in', `(${ids.map(id => `'${id}'`).join(',')})`);
  }
  
  const { error: delError } = await deleteQuery;
  if (delError) console.error('saveTasks delete error:', delError);
}

export async function loadChannels(userId: string): Promise<Record<string, string>> {
  const defaults = { c1: 'Channel 1', c2: 'Channel 2', c3: 'Channel 3' };
  const { data, error } = await supabase
    .from('channels')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('loadChannels error:', error);
    return defaults;
  }
  
  const out = { ...defaults };
  (data || []).forEach((r: any) => {
    out['c' + r.slot] = r.label || defaults['c' + r.slot];
  });
  return out;
}

export async function saveChannels(userId: string, channels: Record<string, string>): Promise<void> {
  const rows = [1, 2, 3].map(slot => ({
    user_id: userId,
    slot,
    label: channels['c' + slot] || '',
  }));
  
  const { error } = await supabase.from('channels').upsert(rows);
  if (error) console.error('saveChannels error:', error);
}
