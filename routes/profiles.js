const express = require('express');
const router = express.Router();

const getProfiles = require('../functions/profiles/getProfiles');
const getProfileById = require('../functions/profiles/getProfileById');
const createProfile = require('../functions/profiles/createProfile');
const updateProfile = require('../functions/profiles/update_Profile');
const deleteProfile = require('../functions/profiles/deleteProfile');

const pool = require('../config/db');

// GET ALL
router.get('/', async (req, res) => {
  const result = await getProfiles();
  res.json(result);
});

// GET BY ID
router.get('/:id', async (req, res) => {
  const result = await getProfileById(req.params.id);
  res.json(result);
});

// CREATE
router.post('/', async (req, res) => {
  const result = await createProfile(req.body);
  res.json(result);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const result = await updateProfile(req.params.id, req.body);
  res.json(result);
});

// DELETE
router.delete('/:id', async (req, res) => {
  const result = await deleteProfile(req.params.id);
  res.json(result);
});

module.exports = router;