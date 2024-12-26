package main

import (
	"backend/db"

	"github.com/gin-gonic/gin"
)

func main() {
	db.Initialize()

	router := gin.Default()

	router.POST("/auth/register", db.CreateUser)
	router.GET("/users", db.GetAllUser)
	router.GET("/users/:id", db.GetUserID)
	router.GET("/post/:category", db.GetCategoryPost)
	router.Run(":3333")
}
