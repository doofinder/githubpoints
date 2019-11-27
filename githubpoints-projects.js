var calculateIssuePoints = function () {
  let links = document.getElementsByClassName('js-project-card-issue-link');
  for (let count = 0; count < links.length; count++) {
    let link = links[count];
    let points_mark = link.text.match(/^\(\d+\)*/);
    if (points_mark) {
      let points = points_mark[0].replace(/\(|\)/g, '');
      link.innerHTML = link.text.replace(/^\(\d+\)/, '<span class="issue-points">' + points + '</span>');
    }
  };
};

var drawProgressBars = function(to_do, doing, done) {
  let total = to_do + doing + done;

  let doing_percent = 0;
  let done_percent = 0;
  
  if (total > 0) {
    doing_percent = (doing / total) * 100;
    done_percent = (done / total) * 100;
  }

  let pointsBarElement = document.getElementById('pointsBar');

  if (pointsBarElement) {
    pointsBarElement.parentNode.removeChild(pointsBarElement);
  }

  let header = document.getElementsByClassName('project-header')[0];
  let barsPlace = header.getElementsByClassName('f5')[0];

  let pointBarHTML = `<div id="pointsBar" class="ml-3 d-inline-block">
    <div style="width: 100px">
      <div class="tooltipped tooltipped-s" aria-label="${done} done / ${doing} in progress / ${to_do} to do">
        <span class="progress-bar progress-bar-small">
          <span style="width: ${done_percent}%;" class="progress d-inline-block bg-blue">&nbsp;</span><span style="width: ${doing_percent}%;" class="progress d-inline-block bg-yellow">&nbsp;</span>
        </span>
      </div>
    </div>`;

  barsPlace.innerHTML += pointBarHTML;
}

var updatePoints = function () {
  calculateIssuePoints();
  var to_do = 0;
  var doing = 0;
  var done = 0;
  let columns = document.getElementsByClassName('project-column');

  for (let count = 0; count < columns.length; count++) {
    let total = 0;
    let column = columns[count];
    let column_name = column.getElementsByClassName('js-project-column-name')[0].innerHTML;
    let articles = column.getElementsByTagName('article')
    for (let j = 0; j < articles.length; j++) {
      // only sum if visible
      if (!articles[j].classList.contains('d-none')) {
        point_marks = articles[j].getElementsByClassName('issue-points')[0];
        if (point_marks){
          total += parseInt(point_marks.textContent);
        }
      }
    }
    let header = column.getElementsByTagName('h3')[0];
    let column_points = header.getElementsByClassName('column-points');
    if (column_points.length > 0) {
      column_points[0].innerHTML = total;
    } else {
      header.innerHTML = '<span class="column-points">' + total + '</span>' + header.innerHTML;
    }
    switch (column_name) {
      case 'To do':
        to_do = total;
        break;
      case 'In progress':
        doing = total;
        break;
      case 'Done':
        done = total;
    }
  };
  drawProgressBars(to_do, doing, done);
};

window.setInterval(updatePoints, 2000);
