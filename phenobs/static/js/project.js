function formatDate(dateToFormat, includeYear=true) {
    let options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    };

    if (includeYear)
        options.year = 'numeric';

    return dateToFormat.toLocaleString('en-US', options);
}

function checkConnection() {
    // $.ajax({
    //     url: "/200",
    //     error: function (jqXHR) {
    //         $('#signout').addClass('disabled');
    //         $('#myprofile').addClass('disabled');
    //         $('#offline').removeClass('d-none');
    //         $('#online').addClass('d-none');
    //         return false;
    //     },
    //     success: function (data) {
    //         $('#signout').removeClass('disabled');
    //         $('#myprofile').removeClass('disabled');
    //         $('#online').removeClass('d-none');
    //         $('#offline').addClass('d-none');
    //         return true;
    //     }
    // });
}

function isReachable(url) {
  return fetch(url, { method: 'HEAD', mode: 'no-cors' })
    .then(function(resp) {
      return resp && (resp.ok || resp.type === 'opaque');
    })
    .catch(function(err) {
      console.warn('[conn test failure]:', err);
    });
}

function handleConnection() {
  if (navigator.onLine) {
      isReachable('/200').then(function(online) {
      if (online) {
          $('#signout').removeClass('disabled');
          $('#myprofile').removeClass('disabled');
          $('#online').removeClass('d-none');
          $('#offline').addClass('d-none');
          console.log('online');
      } else {
          $('#signout').addClass('disabled');
          $('#myprofile').addClass('disabled');
          $('#offline').removeClass('d-none');
          $('#online').addClass('d-none');
          console.log('no connectivity');
      }
    });
  } else {
      $('#signout').addClass('disabled');
      $('#myprofile').addClass('disabled');
      $('#offline').removeClass('d-none');
      $('#online').addClass('d-none');
      console.log('offline');
  }
}

$(document).ready(function() {
    // checkConnection();
    // setInterval(() => checkConnection(), 15000);
    handleConnection();
    window.addEventListener('online', handleConnection);
    window.addEventListener('offline', handleConnection);
});

if (document.getElementById('home-date') != null)
    changeHomeDate();

function changeHomeDate() {
    let homeDate = document.getElementById('home-date');
    homeDate.innerText = formatDate(new Date(), false).toString();
}
