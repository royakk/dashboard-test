import React, { useState, useEffect ,useContext} from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setTheme,selectTheme } from "../helpers/store/ui";

import { useTranslation } from 'react-i18next';
import {Context} from '../helpers/context/themContext'
import {
  TextField,
  Button,
  Stack,
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import i18n from  "../helpers/i18n";
const Profile = () => {
  const dispatch = useDispatch();
    const themeee= useSelector((state) => state.theme )
    console.log("theme in profile",themeee);
  const { t, i18n, ready } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: "",
      theme: "",
      locale: "",
    },
    onSubmit: (values) => {
      console.log(values);
        i18n.changeLanguage(values.locale);
        dispatch(setTheme(values.theme))
        localStorage.setItem("user",values.name)
        

      
    },
  });
  useEffect(() => {
    if (i18n.language === "fa") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, [i18n.language]);
 
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Stack
        spacing={2}
          sx={{
            padding:3,
            minWidth: "350px",
            backgroundColor: "#f2f2f2",
            borderRadius: "10px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <TextField
            {...formik.getFieldProps("name")}
            label="Name"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Theme</InputLabel>
            <Select
              {...formik.getFieldProps("theme")}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Theme"
              onChange={formik.handleChange}
            >
              <MenuItem value='light'>Light</MenuItem>
              <MenuItem value='dark'>Dark</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Locale</InputLabel>
            <Select
              {...formik.getFieldProps("locale")}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Locale"
              onChange={formik.handleChange}
             
            >
              <MenuItem value='en'>En</MenuItem>
              <MenuItem value='fa'>Fa</MenuItem>
            </Select>
           
          </FormControl>
        </Stack>
        <Button sx={{backgroundColor:'#1565c0',my:2}} fullWidth variant="outlined" type="submit">Save</Button>
      </form>
      
    </div>
  );
};

export default Profile;
