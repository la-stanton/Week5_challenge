var currentDayEl = $('#currentDay');
var containerEl = $('.container-lg');

//Time var for business hours 9AM - 5PM
var hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
var workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

var now = dayjs();
var storedItems = {};

//Display date and time
currentDayEl.text(now.format('dddd, MMMM YYYY, hh:mm'));

var currentHour = now.format('H');

//func that creates new element hourly timeblock with styling from original index file
function createTimeBlock() {
  for (var i = 0; i < hours.length; i++) {
    //VAR to create new el
    var hourRow = $('<div>');
    var timeRow = $('<div>');
    var descRow = $('<textarea>');
    var saveBtn = $('<button>');

    hourRow.addClass('row time-block');
    hourRow.attr('id', hours[i]);
    timeRow.addClass('col-2 col-md-1 hour text-center py-3 ');
    descRow.addClass('col-8 col-md-10 description');
    descRow.attr('row', '3');
    saveBtn.addClass('btn saveBtn col-2 col-md-1');
    saveBtn.attr('aria-lable', 'save');
    saveBtn.html(' <i class="fas fa-save" aria-hidden="true"></i>');

    timeRow.text(hours[i]);

    // const hourNum = Number.parseFloat(hours[i]);

    if (currentHour == workingHours[i]) {
      hourRow.addClass('present');
    } else if (currentHour < workingHours[i]) {
      hourRow.addClass('future');
    } else if (currentHour > workingHours[i]) {
      hourRow.addClass('past');
    }

    hourRow.append(timeRow);
    hourRow.append(descRow);
    hourRow.append(saveBtn);

    //append main div to the container
    containerEl.append(hourRow);
  }
}

//Call the func
createTimeBlock();

//create function to store inputs to local storage
function loadStoredData() {
  //get the data from localStorage & if its empty create new empty obj
  storedItems = JSON.parse(localStorage.getItem('storedItems')) || {};

  $.each(storedItems, function (time, text) {
    var hourBlock = $('.time-block')
      .find('.hour')
      .filter(function () {
        return $(this).text() === time;
      });

    var textBlock = hourBlock.siblings('.description').text(text);
    //console.log(textBlock);
  });
}

//Call function
loadStoredData();

$(function () {
  // TODO: Add a listener for click events on the save button. This code should

  $('.saveBtn').on('click', function () {
    var time = $(this).closest('div').find('.hour').text();

    var text = $(this).siblings('.description').val();

  
    storedItems[time] = text;

    //Store in local storage
    localStorage.setItem('storedItems', JSON.stringify(storedItems));

  });
});