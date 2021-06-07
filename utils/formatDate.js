const formatDate = (date) => {
  const preFormatDate = date.split('T')[0];
  let [year, month, day] = preFormatDate.split('-');
  const postFormatDate = `${month}-${day}-${year}`;
  return postFormatDate;
};

module.exports = formatDate;
