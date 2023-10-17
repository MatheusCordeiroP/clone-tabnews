const status = (request, response) => {
  response.status(200).json({ response: 'hello World' });
};

export default status;
