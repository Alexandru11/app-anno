export default {
  getSentimentLabel(value) {
    let sentimentLabel;
    switch (value) {
      case 'extreme-neg-radio':
        sentimentLabel = 'Extremely negative';
        break;
      case 'very-neg-radio':
        sentimentLabel = 'Very negative';
        break;
      case 'neg-radio':
        sentimentLabel = 'Negative';
        break;
      case 'neutral-radio':
        sentimentLabel = 'Neutral';
        break;
      case 'pos-radio':
        sentimentLabel = 'Positive';
        break;
      case 'very-pos-radio':
        sentimentLabel = 'Very positive';
        break;
      case 'extreme-pos-radio':
        sentimentLabel = 'Extremely positive';
        break;
      default:
        sentimentLabel = '';
        break;
    }
    return sentimentLabel;
  },
};
