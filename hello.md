<div dir="rtl">

## פרויקט ניהול הצי של נאט"ו

### מטרת הפרויקט
לפתח אפליקציה מלאה (Full-stack) לניהול הצי של נאט"ו, תוך התמקדות בטכנולוגיות React, TypeScript, Redux Toolkit ו-Custom Hooks.

### דרישות פונקציונליות
1. צפייה במדינות נאט"ו והציוד הצבאי שלהן
2. בניית וניהול צוותי נאט"ו
3. ביצוע פעולות CRUD על צוותי נאט"ו
4. ניהול מצב גלובלי עם Redux Toolkit
5. שימוש ב-Custom Hooks לניהול לוגיקה אסינכרונית
6. ניתוב בין העמודים השונים באמצעות React Router

### שלבי פיתוח

#### שלב 1: הקמת הפרויקט
1. התקנת Vite ויצירת פרויקט React-TypeScript חדש
2. הגדרת מבנה תיקיות ראשוני (src, components, pages, hooks, store)
3. התקנת חבילות נדרשות: axios, react-router-dom, @reduxjs/toolkit

דוגמה:

<div dir="ltr">

```bash
npm create vite@latest nato-fleet-management --template react-ts
cd nato-fleet-management
npm install
npm install axios react-router-dom @reduxjs/toolkit
```

</div>

#### שלב 2: פיתוח ה-Backend
1. הקמת שרת Node.js עם Express
2. יצירת קובץ הנתונים הראשוני `natoData.json`
3. כתיבת נקודת קצה GET ל-`/api/nato` להחזרת הנתונים
4. הוספת נקודות קצה POST, PUT, DELETE ל-`/api/teams` לניהול צוותים

דוגמה של קובץ `natoData.json`:

<div dir="ltr">

```json
[
  {
    "country": "USA",
    "equipment": {
      "infantry": 100,
      "tanks": 50,
      "aircraft": 75
    }
  },
  {
    "country": "UK",
    "equipment": {
      "infantry": 80,
      "tanks": 30,
      "aircraft": 60
    }
  }
]
```

</div>

דוגמה של נקודת קצה GET ב-`server.js`:

<div dir="ltr">

```javascript
app.get('/api/nato', (req, res) => {
  const data = require('./natoData.json');
  res.json(data);
});
```

</div>

#### שלב 3: פיתוח ה-Frontend
1. הוספת React Router DOM לאפליקציה
   - עטיפת האפליקציה ב-`BrowserRouter`
   - יצירת נתיבים עבור העמודים השונים

דוגמה לשימוש ב-React Router DOM:

<div dir="ltr">

```tsx
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CreateTeamPage } from './pages/CreateTeamPage';
import { TeamsPage } from './pages/TeamsPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={HomePage} />
      <Route path="/create-team" component={CreateTeamPage} />
      <Route path="/teams" component={TeamsPage} />
    </BrowserRouter>
  );
};

export default App;
```

</div>

2. יצירת דף ראשי להצגת מדינות נאט"ו והציוד הצבאי שלהן
   - מימוש Custom Hook `useFetchAllies` להבאת הנתונים מה-API
   - שימוש ב-Redux Toolkit ליצירת Slice לניהול המדינות

דוגמה של Custom Hook `useFetchAllies`:

<div dir="ltr">

```typescript
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAllies } from './alliesSlice';

export const useFetchAllies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllies = async () => {
      const response = await axios.get('/api/nato');
      dispatch(setAllies(response.data));
    };
    fetchAllies();
  }, [dispatch]);
};
```

</div>

3. יצירת דף `CreateTeam` ליצירת צוותי נאט"ו חדשים
   - פיצול לקומפוננטות `AvailableInventory` ו-`SelectedTeam`
   - מימוש Custom Hooks להוספה והסרה של יחידות לצוות
   - ניהול מצב הצוות ב-Redux באמצעות Slice נפרד

דוגמה של קומפוננטת `AvailableInventory`:

<div dir="ltr">

```tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const AvailableInventory: React.FC = () => {
  const allies = useSelector((state: RootState) => state.allies);

  return (
    <div>
      <h2>Available Inventory</h2>
      {allies.map((ally) => (
        <div key={ally.country}>
          <h3>{ally.country}</h3>
          <p>Infantry: {ally.equipment.infantry}</p>
          <p>Tanks: {ally.equipment.tanks}</p>
          <p>Aircraft: {ally.equipment.aircraft}</p>
        </div>
      ))}
    </div>
  );
};
```

</div>

4. יצירת דף `TeamsPage` להצגת הצוותים הקיימים
   - הוספת יכולות עריכה ומחיקה של צוותים
   - שימוש בפעולות Redux לעדכון ומחיקה
5. מימוש צפייה מהירה ומחיקת צוות באמצעות מודאל
   - ניהול המודאל ופעולות המחיקה ב-Redux

#### שלב 4: ניהול מצב אסינכרוני
1. יצירת Custom Hooks לביצוע בקשות CRUD לשרת
   - `useCreateTeam`, `useUpdateTeam`, `useDeleteTeam`

דוגמה של Custom Hook `useCreateTeam`:

<div dir="ltr">

```typescript
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { createTeam } from './teamsSlice';

export const useCreateTeam = () => {
  const dispatch = useDispatch();

  const createNewTeam = async (teamData: any) => {
    try {
      const response = await axios.post('/api/teams', teamData);
      dispatch(createTeam(response.data));
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return createNewTeam;
};
```

</div>

2. עדכון ה-Slices ב-Redux לניהול מצבי טעינה, הצלחה ושגיאה

דוגמה של Slice `teamsSlice` עם ניהול מצב אסינכרוני:

<div dir="ltr">

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Team {
  id: string;
  name: string;
  units: any;
}

interface TeamsState {
  teams: Team[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamsState = {
  teams: [],
  loading: false,
  error: null,
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    createTeamStart(state) {
      state.loading = true;
      state.error = null;
    },
    createTeamSuccess(state, action: PayloadAction<Team>) {
      state.loading = false;
      state.teams.push(action.payload);
    },
    createTeamFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // ... other reducers
  },
});

export const {
  createTeamStart,
  createTeamSuccess,
  createTeamFailure,
  // ... other actions
} = teamsSlice.actions;

export default teamsSlice.reducer;
```

</div>

3. הצגת הודעות והתראות למשתמש על בסיס תוצאות הפעולות

#### שלב 5: שיפורים והרחבות
1. עיצוב ושיפור חווית המשתמש (UI/UX)

דוגמה של עיצוב רשימת הצוותים עם טאבים:

<div dir="ltr">

```tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const TeamsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('infantry');
  const teams = useSelector((state: RootState) => state.teams);

  return (
    <div>
      <h2>NATO Teams</h2>
      <div>
        <button onClick={() => setActiveTab('infantry')}>Infantry</button>
        <button onClick={() => setActiveTab('tanks')}>Tanks</button>
        <button onClick={() => setActiveTab('aircraft')}>Aircraft</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Total Units</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td>{team.units[activeTab]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

</div>

2. טיפול בשגיאות והצגת הודעות ידידותיות למשתמש
3. הוספת יכולות סינון, מיון וחיפוש של מדינות וצוותים
4. שיפור ביצועים והוספת אופטימיזציות

### סיכום
פרויקט זה מדגים פיתוח אפליקציית Full-stack עם דגש על React, TypeScript, Redux Toolkit ו-Custom Hooks. דרך מימוש פעולות CRUD, ניהול מצב גלובלי ושימוש בלוגיקה אסינכרונית, הפרויקט מספק בסיס חזק להבנת עקרונות פיתוח אפליקציות ווב מודרניות ומודולריות. הוספת ניתוב באמצעות React Router DOM מאפשרת ניווט חלק בין העמודים השונים ומשפרת את חווית המשתמש.

</div>