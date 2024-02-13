const getSocketStateString = (socketState) => {
  switch (socketState) {
    case -1:
      return "Socket Disconnected";
    case 0:
    case 1:
      return "Socket Connected";
    default:
      return "Socket State Unknown";
  }
};

const getSocketStateColor = (socketState) => {
  switch (socketState) {
    case -1:
      return "red.500";
    case 0:
      return "green.500";
    case 1:
      return "orange.500";
    default:
      return "gray.500";
  }
};

export { getSocketStateString, getSocketStateColor };
