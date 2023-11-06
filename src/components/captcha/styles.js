export const useStyles = () => {
  return {
    captchaContainer: {
      background: "#cacdd2",
      marginTop: "20px",
      padding: "20px 30px"
    },
    captchaBackground: {
      background: "white",
      padding: "20px",
      borderRadius: "5px",
      marginBottom: "5px"
    },
    capText: {
      paddingBottom: "5px"
    },
    captchaText: {
      fontFamily: ["Arial", "Helvetica", "sans-serif"][Math.floor(Math.random() * 3)],
      fontStyle: "italic",
      fontSize: "26px",
      color: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`,
      marginLeft: "40px"
    },

    captchaSuccess: {
      color: "green"
    },
    captchaError: {
      color: "#c5001a"
    }
  }
}
