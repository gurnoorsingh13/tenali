/**
 * events.js — lightweight engagement logging for the Why Layer features
 * (Why-learn-this opens, unlock-chip clicks, map opens, checkpoint passes).
 *
 * Reuses the existing LearningEvent model and emit() helper — this is not
 * a new analytics system, just the first thing that actually calls a
 * write path that already existed with nothing writing to it, same shape
 * as mastery.js was for ConceptMastery before /api/mastery existed.
 */

const express = require('express');
const { requireAuth } = require('./auth');
const eventGenerator = require('./lil/eventGenerator');

const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
  const { eventType, topicId, details } = req.body || {};
  if (!eventType) return res.status(400).json({ error: 'eventType is required' });
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      return res.json({ ok: true, logged: false, reason: 'no-db' });
    }
    await eventGenerator.emit(req.user.id, eventType, topicId || null, details || {});
    res.json({ ok: true, logged: true });
  } catch (err) {
    console.error('[events] emit failed:', err.message);
    // Telemetry must never break the feature it's watching.
    res.json({ ok: true, logged: false, reason: 'error' });
  }
});

module.exports = { router };
