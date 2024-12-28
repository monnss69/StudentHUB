package db

import (
	"backend/interfaces"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"golang.org/x/crypto/bcrypt"
)

var DB *gorm.DB

// Initialize initializes the database connection
func Initialize() {
	var err error
	DB, err = gorm.Open(postgres.Open("host=localhost user=postgres password=! dbname=postgres port=5432 sslmode=disable"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	log.Println("Successfully connected to database!")
}

// Create user
func CreateUser(c *gin.Context) {
	var newUser interfaces.User

	if err := c.BindJSON(&newUser); err != nil {
		c.JSON(400, gin.H{"error": "Error binding JSON"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.PasswordHash), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(500, gin.H{"error": "Error hashing password"})
		return
	}

	newUser.PasswordHash = string(hashedPassword)

	result := DB.Create(&newUser)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Error creating user"})
		return
	}

	newUser.PasswordHash = "" // Clear password in response

	c.JSON(200, newUser)
}

// Search all users
func GetAllUser(c *gin.Context) {
	var users []interfaces.User

	result := DB.Find(&users)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Error finding users"})
		return
	}

	c.JSON(http.StatusOK, users)
}

// Delete User
func DeleteUser(c *gin.Context) {
	id := c.Param("id")

	result := DB.Delete(&interfaces.User{}, id)
	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, "Invalid User ID")
	}

	c.JSON(http.StatusOK, "User Deleted")
}

// Find users by their id
func GetUserID(c *gin.Context) {
	id := c.Param("id")
	var user interfaces.User

	result := DB.First(&user, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Error finding user"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// Create post
func CreatePost(c *gin.Context) {
	var newPost interfaces.Post

	err := c.BindJSON(&newPost)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid information"})
		return
	}

	result := DB.Create(&newPost)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error when creating post"})
		return
	}

	c.JSON(http.StatusOK, newPost)
}

// Get posts based on category
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

// Get post by ID
func GetPostID(c *gin.Context) {
	postID, err := uuid.Parse(c.Param("post_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID format"})
		return
	}

	var post interfaces.Post

	result := DB.Model(&interfaces.Post{}).Where("id = ?", postID).First(&post)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}

	c.JSON(http.StatusOK, post)
}

// Delete post
func DeletePost(c *gin.Context) {
	postID, err := uuid.Parse(c.Param("post_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID format"})
		return
	}

	result := DB.Delete(&interfaces.Post{}, postID)
	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, "Invalid post ID")
	}

	c.JSON(http.StatusOK, "Post Deleted")
}

// Get comment for post
func GetCommentPost(c *gin.Context) {
	postID, err := uuid.Parse(c.Param("post_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post ID format"})
		return
	}

	var comment []interfaces.Comment

	result := DB.Model(&interfaces.Comment{}).Where("post_id = ?", postID).Find(&comment)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Comment not found"})
		return
	}

	c.JSON(http.StatusOK, comment)
}

// Edit post
func EditPost(c *gin.Context) {
	postID, err := uuid.Parse(c.Param("post_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid edit request"})
		return
	}

	var user interfaces.User

	result := c.BindJSON(&user)
	if result != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid post format"})
		return
	}

	result0 := DB.Model(&interfaces.User{}).Where("id = ?", postID).Updates(&user)
	if result0.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error when updating post"})
		return
	}

	c.JSON(http.StatusOK, "Post updated")
}

// Get all category
func GetCategory(c *gin.Context) {
	var category []interfaces.Category

	result := DB.Find(&category)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Error finding category"})
		return
	}

	c.JSON(http.StatusOK, category)
}
