

import React from "react"
import { useState } from "react"
import { useStyles } from "./styles"
import { Grid, Typography } from "@mui/material"
import { useEffect } from "react"

const Captcha = () => {
  const styles = useStyles()
  const [captchaText, setCaptchaText] = useState(generateRandomText())
  const [userInput, setUserInput] = useState("")
  const [isCaptchaValid, setIsCaptchaValid] = useState(null)

  useEffect(() => {
    setCaptchaText(generateRandomText())
  }, [])
  function generateRandomText() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_+"
    let captchaText = ""
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      captchaText += characters.charAt(randomIndex)
    }
    return captchaText
  }
  const handleInputChange = (e) => {
    setUserInput(e.target.value)
  }

  const checkCaptcha = () => {
    if (userInput === captchaText) {
      setIsCaptchaValid(true)
    } else {
      setIsCaptchaValid(false)
    }
  }
  const refreshCaptcha = () => {
    setCaptchaText(generateRandomText())
    setUserInput("")
    setIsCaptchaValid(null)
  }
  return (
    <Grid item sx={styles.captchaContainer}>
      <Grid item sx={styles.captchaBackground}>
        <Typography sx={styles.captchaText}>{captchaText}</Typography>
      </Grid>

      <Grid item>
        <Grid item>
          <Typography sx={styles.capText}>Enter Captcha</Typography>
        </Grid>

        <input
          style={{
            padding: "10px 40px 10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
          type="text"
          placeholder="Enter CAPTCHA"
          value={userInput}
          onChange={handleInputChange}
        />
        <Grid container display="flex" justifyContent="space-between">
        <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "5px"
            }}
            onClick={refreshCaptcha}>
            Refresh
          </button>
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "5px"
            }}
            onClick={checkCaptcha}>
            Submit
          </button>
          
        </Grid>
        
        {isCaptchaValid ? (
          <Typography sx={styles.captchaSuccess}>CAPTCHA is valid!</Typography>
        ) : (
          <Typography sx={styles.captchaError}>CAPTCHA is invalid. Please try again.</Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default Captcha
