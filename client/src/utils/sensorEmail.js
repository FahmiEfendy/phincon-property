const sensorEmail = (email) => {
  const atIndex = email.indexOf('@');

  const visiblePart = email.substring(0, 3);
  const domain = email.substring(atIndex);
  const username = email.substring(3, atIndex);
  const censoredUsername = `${visiblePart}***${username.slice(-3)}`;
  const censoredEmail = censoredUsername + domain;
  return censoredEmail;
};

export default sensorEmail;
