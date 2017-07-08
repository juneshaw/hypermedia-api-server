const express = require('express')
const router = express.Router()
const db = require('../lib/db')
const linker = require('../lib/linker')

router.get('/people/:personId/meetings', (req, res, next) => {
  const meetings = db.meetings
    .findAll()
    .filter(withParticipant(req.params.personId))

  res.json(serializeMeetings(req, meetings))
})

router.post('/people/:personId/meetings', (req, res, next) => {
  const meeting = db.meetings.insert({
    person1_id: parseInt(req.params.personId, 10),
    person2_id: parseInt(req.body.otherPersonId, 10),
    comment: req.body.comment,
  })

  res.json(serializeMeeting(req, meeting))
})

function serializeMeetings(req, meetings) {
  return {
    _links: {
      self: {
        href: linker(req, `/api/people/${req.params.personId}/meetings`)
      }
    },
    _embedded: {
      meetings: meetings.map(meeting => serializeMeeting(req, meeting))
    }
  }
}

function serializeMeeting(req, meeting) {
  return {
    _links: {
      self: {
        href: linker(req, `/api/people/${req.params.personId}/meetings/${meeting.id}`)
      }
    },
    people: [
      { id: meeting.person1_id, ref: linker(req, `/api/people/${meeting.person1_id}`) },
      { id: meeting.person2_id, ref: linker(req, `/api/people/${meeting.person2_id}`) },
    ],
    id: meeting.id,
    comment: meeting.comment,
  }
}

function withParticipant(personId) {
  personId = parseInt(personId, 10)
  return function(meeting) {
    return meeting.person1_id === personId || meeting.person2_id === personId
  }
}

module.exports = router
