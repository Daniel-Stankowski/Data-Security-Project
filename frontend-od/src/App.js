import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ProtectedRoute } from './components/ProtectedRoute';
import { GlobalStyles } from '@mui/material';
import NavBar from './components/NavBar';
import Home from './pages/home/Home'
import MyNotes from './pages/myNotes/myNotes';
import PublicNotes from './pages/publicNotes/publicNotes';
import NoteDetails from './pages/noteDetails/noteDetails';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        light: '#152828',
        main: '#080F0F',
        dark: '#0C0808'
      },
      secondary: {
        main: '#A2B9B6',
        light: '#AEC2BF',
        dark: '#739691'
      }
    }
  })


  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={{
            body: { backgroundColor: '#152828'},
          }}/>
        <NavBar/>
          <Routes>
            <Route index element={<Home/>}/>
            <Route element={<ProtectedRoute/>}>
              <Route path='/myNotes' element={<MyNotes/>}/>
              <Route path='/publicNotes' element={<PublicNotes/>}/>
              <Route path='/note/:id' element={<NoteDetails/>}/>
            </Route>
          </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
