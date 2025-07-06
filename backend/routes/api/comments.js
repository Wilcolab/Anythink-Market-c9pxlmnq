/**
 * @module routes/api/comments
 * @description Express router for handling comment-related API endpoints.
 */

 /**
    * GET /
    * @summary Retrieve all comments.
    * @description Fetches all comments from the database, sorted by creation date (most recent first).
    * @route GET /api/comments
    * @returns {Array<Object>} 200 - An array of comment objects
    * @returns {Object} 500 - Error message if fetching fails
    */

 /**
    * DELETE /:id
    * @summary Delete a comment by ID.
    * @description Deletes a comment from the database using its unique identifier.
    * @route DELETE /api/comments/:id
    * @param {string} id.path.required - The ID of the comment to delete
    * @returns {null} 204 - No content, comment deleted successfully
    * @returns {Object} 500 - Error message if deletion fails
    */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

// Hey GitHub Copilot,

router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch comments" });
    }
});

// Add another endpoint for deleting a comment
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Comment.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
});