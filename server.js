import { toggleClass, checkType } from "/uxtech/js/module";
import Chart from "chart.js/auto";
import dataReports from "/uxtech/json/weekly_report.json";
// import * as dayjs from 'dayjs'

(function () {
  // JSON데이터를 변수에 할당한다.
  let products = dataReports;

  console.log(products);

  let emptyWeeklyArr = products.map((product) => {
    return product.weekly;
  });

  console.log("emptyWeeklyArr=", emptyWeeklyArr);

  // 최근 한달 구하기
  let deleteWeeklyDup = emptyWeeklyArr.filter((item, idx, arr) => {
    return arr.indexOf(item) === idx;
  });
  console.log("deleteWeeklyDup=", deleteWeeklyDup);

  const lastMonth = (function getLastMonth(weeklyList) {
    let spliceWeekly = weeklyList.splice(-4);
    return spliceWeekly;
  })(deleteWeeklyDup);
  console.log("lastMonth=", lastMonth);

  // let deleteProjectDup = emptyProjectArr.reduce((a, b) => {
  //   if (a.indexOf(b) < 0) a.push(b)
  //   return a
  // }, [])
  // console.log(deleteProjectDup);

  // 할당된 변수에서 project값을 배열 로 추출한다.
  // let emptyProjectArr = [];
  // for (let i = 0; i < products.length; i++) {
  //   emptyProjectArr.push(products[i].project);
  // }
  // products.forEach(product => {
  //   emptyProjectArr.push(product.project)
  // })

  // console.log('lastMonthArr=', lastMonthArr);

  // let emptyProjectArr = lastMonthArr.map(item => {
  //   return item.project
  // })

  // let emptyProjectArr = products.map(product => {
  //   return product.project
  // })
  // console.log('emptyProjectArr=', emptyProjectArr);
  // 추출한 배열에서 중복된 요소를 제거한다.

  function getLastMonthArr(obj) {
    let findLastMonthObj = lastMonth.find((x) => obj.weekly.includes(x));
    return findLastMonthObj;
  }
  const lastMonthArr = products.filter((product) => getLastMonthArr(product));

  const LastCountArr = (function checkCount(items) {
    let projectCount = Array.from(Array(4), () => Array(4).fill(0));
    items.forEach((item, idx, arr) => {
      if (item.project === "nhm") {
        if (item.weekly === lastMonth[lastMonth.length - 4]) {
          projectCount[0][0] += 1;
        } else if (item.weekly === lastMonth[lastMonth.length - 3]) {
          projectCount[0][1] += 1;
        } else if (item.weekly === lastMonth[lastMonth.length - 2]) {
          projectCount[0][2] += 1;
        } else if (item.weekly === lastMonth[lastMonth.length - 1]) {
          projectCount[0][3] += 1;
        }
      } else if (item.project === "hip") {
        if (item.weekly === lastMonth[lastMonth.length - 4]) {
          projectCount[1][0] += 1;
        } else if (item.weekly === lastMonth[lastMonth.length - 3]) {
          projectCount[1][1] += 1;
        } else if (item.weekly === lastMonth[lastMonth.length - 2]) {
          projectCount[1][2] += 1;
        } else if (item.weekly === lastMonth[lastMonth.length - 1]) {
          projectCount[1][3] += 1;
        }
      } else if (item.project === "pra") {
        if (item.weekly === lastMonth[lastMonth.length - 4]) {
          projectCount[2][0] += 1;
        } else if (item.weekly === lastMonth[lastMonth.length - 3]) {
          projectCount[2][1] += 1;
        } else if (item.weekly === lastMonth[lastMonth.length - 2]) {
          projectCount[2][2] += 1;
        } else if (item.weekly === lastMonth[lastMonth.length - 1]) {
          projectCount[2][3] += 1;
        }
      } else if (item.project === "etc") {
        if (item.weekly === lastMonth[lastMonth.length - 4]) {
          projectCount[3][0] += 1;
        } else if (item.weekly === lastMonth[lastMonth.length - 3]) {
          projectCount[3][1] += 1;
        } else if (item.weekly === lastMonth[lastMonth.length - 2]) {
          projectCount[3][2] += 1;
        } else if (item.weekly === lastMonth[lastMonth.length - 1]) {
          projectCount[3][3] += 1;
        }
      }
    });
    return projectCount;
  })(lastMonthArr);
  // console.log('checkCount(lastMonthArr)=', checkCount(lastMonthArr));

  const divisionProjectCount = (function projectDivision(items) {
    // 운영
    const arr0 = items[0].reduce((prev, cur) => {
      return prev + cur;
    }, 0);

    // 구축
    const arr1 = items[1].reduce((prev, cur) => {
      return prev + cur;
    }, 0);

    // 운영
    const arr2 = items[2].reduce((prev, cur) => {
      return prev + cur;
    }, 0);

    // 기타
    const arr3 = items[3].reduce((prev, cur) => {
      return prev + cur;
    }, 0);

    const divisionArr = [arr1, arr0 + arr2];
    return divisionArr;
  })(LastCountArr);

  // console.log(projectDivision(LastCountArr));

  // 바 차트
  const barData = {
    labels: lastMonth,
    datasets: [
      {
        label: "nhm",
        data: LastCountArr[0],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, .5)",
        borderColor: "rgb(75, 192, 192)",
        pointBackgroundColor: "rgb(75, 192, 192)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(75, 192, 192)",
      },
      {
        label: "hip",
        data: LastCountArr[1],
        fill: true,
        backgroundColor: "rgba(255, 205, 86, .5)",
        borderColor: "rgb(255, 205, 86)",
        pointBackgroundColor: "rgb(255, 205, 86)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 205, 86)",
      },
      {
        label: "pra",
        data: LastCountArr[2],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, .5)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "etc",
        data: LastCountArr[3],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, .5)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };

  new Chart(document.querySelector("#barChart"), {
    type: "bar",
    data: barData,
    options: {
      plugins: {
        title: {
          display: false,
          // text: '최근 한 달간 주차 별 프로젝트 이슈 해결 현황 차트'
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });

  const doughnutData = {
    labels: ["구축", "운영"],
    datasets: [
      {
        label: "doughnutChart",
        data: divisionProjectCount,
        backgroundColor: ["rgb(206, 238, 4)", "rgb(10, 165, 234)"],
        hoverOffset: 4,
      },
    ],
  };

  new Chart(document.querySelector("#doughnutChart"), {
    type: "doughnut",
    data: doughnutData,
    options: {
      plugins: {
        title: {
          display: false,
          // text: '최근 한 달 프로젝트 이슈 해결 현황'
        },
      },
      responsive: true,
    },
  });
})();
