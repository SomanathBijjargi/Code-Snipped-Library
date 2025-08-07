const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const { createSnippet,getAllSnippets,getComments,addComment,getSnippetVotes,voteSnippet,getSnippetById } = require('../controllers/snippetController');

router.post('/', authenticate, createSnippet);
router.get('/', getAllSnippets); 
router.get('/:id', getSnippetById);
router.post('/:id/comments', authenticate, addComment);
router.get('/:id/comments', getComments);
router.post('/:id/vote', authenticate, voteSnippet);
router.get('/:id/votes', getSnippetVotes);
module.exports = router;
