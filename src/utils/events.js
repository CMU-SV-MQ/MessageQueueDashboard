import {
  HiDocumentAdd,
  HiDocumentDownload,
  HiInboxIn,
  HiStatusOffline,
  HiStatusOnline,
  HiUser,
  HiUserAdd,
  HiUserGroup,
} from "react-icons/hi";

const eventMap = {
  become_candidate: "Become Candidate",
  become_leader: "Become Leader",
  become_follower: "Become Follower",
  vote_candidate: "Vote for Candidate",
  db_set: "Set Database value",
  db_get: "Get Database value",
  healthy: "Node Online",
  unhealthy: "Node Offline",
};

const eventIconMap = {
  become_candidate: HiUserAdd,
  become_leader: HiUser,
  become_follower: HiUserGroup,
  vote_candidate: HiInboxIn,
  db_set: HiDocumentAdd,
  db_get: HiDocumentDownload,
  healthy: HiStatusOnline,
  unhealthy: HiStatusOffline,
};

const electionEvents = [
  "become_candidate",
  "become_leader",
  "become_follower",
  "vote_candidate",
];

function getEventTimestampString(event) {
  // display to millisecond
  const timeString = new Date(event.timestamp).toLocaleTimeString();
  const millisecondString = (event.timestamp % 1000000)
    .toString()
    .padStart(6, "0");
  return `${timeString}.${millisecondString}`;
}

function isElectionEvent(event) {
  return electionEvents.includes(event.data.type);
}

function sortTimestamp(a, b, order = "desc") {
  if (order === "asc") {
    return a.timestamp - b.timestamp;
  } else {
    return b.timestamp - a.timestamp;
  }
}

function sortEventsByTimestamp(events, order = "asc") {
  return events.sort((a, b) => sortTimestamp(a, b, order));
}

function groupEventsByNodeId(events) {
  let group = {};
  events.forEach((event) => {
    if (group[event.node_id]) {
      group[event.node_id].push(event);
    } else {
      group[event.node_id] = [event];
    }
  });

  Object.keys(group).forEach((node_id) => {
    group[node_id] = sortEventsByTimestamp(group[node_id]);
  });
  return group;
}

function groupElectionEventsByTerm(events) {
  let group = {};
  events.forEach((event) => {
    if (isElectionEvent(event)) {
      if (group[event.data.term]) {
        group[event.data.term].push(event);
      } else {
        group[event.data.term] = [event];
      }
    }
  });
  Object.keys(group).forEach((term) => {
    group[term] = sortEventsByTimestamp(group[term]);
  });
  return group;
}

export {
  eventMap,
  eventIconMap,
  sortEventsByTimestamp,
  groupEventsByNodeId,
  groupElectionEventsByTerm,
  getEventTimestampString,
  isElectionEvent,
};
