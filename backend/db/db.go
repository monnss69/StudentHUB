package db

import (
	"backend/interfaces"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// Initialize initializes the database connection
func Initialize() {
	var err error
	DB, err = gorm.Open(postgres.Open("host=localhost user=postgres password=... dbname=postgres port=5432 sslmode=disable"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	log.Println("Successfully connected to database!")
}

// handle user creation
func CreateUser(c *gin.Context) {
	var newUser interfaces.User

	if err := c.BindJSON(&newUser); err != nil {
		c.JSON(400, gin.H{"error": "Error binding JSON"})
		return
	}

	result := DB.Create(&newUser)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Error creating user"})
		return
	}

	c.JSON(200, newUser)
}

// search all users
func GetAllUser(c *gin.Context) {
	var users []interfaces.User

	result := DB.Find(&users)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Error finding users"})
		return
	}

	c.JSON(http.StatusOK, users)
}

// find users by their id
func GetUserID(c *gin.Context) {
	id := c.Param("id")
	var user interfaces.User

	result := DB.Find(&user, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Error finding user"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// get posts based on category
func GetCategoryPost(c *gin.Context) {
	category := c.Param("category")

	var categoryRecord interfaces.Category
	var posts []interfaces.Post

	result := DB.Model(&interfaces.Category{}).Select("id").Where("name = ?", category).First(&categoryRecord)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	result0 := DB.Find(&posts, "category_id = ?", categoryRecord.ID)
	if result0.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post with this category not found"})
		return
	}

	c.JSON(http.StatusOK, posts)
}

func GetCommentPost(c *gin.Context) {
	postID := c.Param("post_id")

	var comment []interfaces.Comment

	result := DB.Model(&interfaces.Comment{}).Where("PostID = ?", postID).Find(&comment)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Comment not found"})
		return
	}

	c.JSON(http.StatusOK, comment)
}
