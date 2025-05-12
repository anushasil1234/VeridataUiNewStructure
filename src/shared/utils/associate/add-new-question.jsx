import { GetManualVerificationQuestion } from 'server/apis/verify/get-manual-verification-question';

const addNewQuestion = async ({ verificationType }) => {
  const response = await GetManualVerificationQuestion(verificationType);
    const groupByQuestionId = (data) => {
      const seen = new Set();
      const grouped = [];
    
      data.forEach(item => {
        const { questionId, answerId, answerText, action, nextQuestion } = item;
    
        let question = grouped.find(q => q.questionId === questionId);
    
        if (!question) {
          question = {
            ...item,
            answers: []
          };
          grouped.push(question);
          seen.add(questionId);
        }
    
        question.answers.push({ answerId, answerText, action, nextQuestion });
      });
    
      return grouped;
    };
    const groupedData = Object.values(groupByQuestionId(response?.responseInfos));
    return {
        updatedQuestionSet: groupedData
    };
};
export default addNewQuestion;
