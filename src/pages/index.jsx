import products from "@local/constants/productList"
import { MenuOptions } from "@local/constants/publicMenu"
import { useIsLoggedIn } from "@local/hooks/state"
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import styles from "./index.module.scss"
import Image from "next/image"
import {
  trackDashboardButton,
  trackNavLink
} from "@local/models/privateModels/google-analytics-event"
import img from "../../public/images/placeholders/onboardingng.jpg"

function Index() {
  const router = useRouter()
  const isLoggedIn = useIsLoggedIn()

  const [btnLabel, setBtnLabel] = useState("Login")

  useEffect(() => {
    const label = isLoggedIn ? "Go to Dashboard" : "Login"
    setBtnLabel(label)
  }, [isLoggedIn])

  const navigate = () => {
    if (isLoggedIn) {
      router.replace("/user/dashboard")
    } else {
      router.push("/auth/login")
    }
  }

  return (
    <React.Fragment>
      {/* <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head> */}
      <Head>
        <meta property="og:title" content="Product Catalogue"></meta>
        <meta property="og:description" content="Product Catalogue"></meta>
        <meta property="og:image" content={img}></meta>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <AppBar component="nav" color="background">
        <Toolbar style={{ padding: "0 3%" }}>
          <Typography
            variant="h3"
            component="div"
            color="primary"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {MenuOptions.map((item) => {
              if (item.title !== "Custom") {
                return (
                  <Link
                    key={item.link}
                    href={item.link}
                    style={{ padding: "5px 20px 5px 0px" }}
                    onClick={() => trackNavLink(item.link, item.title)}>
                    {item.title}
                  </Link>
                )
              } else {
                return (
                  <Button
                    key={item.link}
                    variant="outlined"
                    onClick={() => (navigate(), trackDashboardButton())}>
                    {btnLabel}
                  </Button>
                )
              }
            })}
          </Box>
        </Toolbar>
      </AppBar>
      <div className={styles.product_list}>
        {products.map((product) => (
          <div key={product.id} className={styles.product_card}>
            <Image
              loading="lazy"
              src={product?.image_url}
              width={250}
              height={250}
              alt="img"
              style={{ objectFit: "contain", mixBlendMode: "multiply" }}
            />
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

export default Index
