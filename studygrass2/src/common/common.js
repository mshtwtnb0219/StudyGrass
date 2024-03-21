// heatmapのcount判定
export function timeCount(value) {
    if (value >= 0 && value <= 30) {
        return 0;
      } else if (value > 30 && value <= 60) {
        return 1;
      } else if (value > 60 && value <= 90) {
        return 2;
      } else if (value > 90 && value <= 120) {
        return 3;
      } else if (value > 120 && value <= 150) {
        return 4;
      } else if (value > 150 && value <= 180) {
        return 5;
      } else {
        return 6;
      }
    }


export function changeDate(dataString) {
  const originalDate = new Date(dataString);
  // 年月日を取得
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth() + 1;
  const day = originalDate.getDate();

  const formatDate = `${year}-${month}-${day}`;
  console.log(formatDate);

}

export const dorpdownOptions = {
    option1: 'java',
    option2: 'html/css',
    option3: 'javascript',
    option4: 'php',
    option5: 'springboot',
    option6: 'AWS',
    option7: 'Linux',
    option8: 'Typescript',
    option9: 'python',
    option10: 'SQL'
};

