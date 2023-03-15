fetch('data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    
    function scopesAray() {
      const newarr = []
      let tempObj;
      const total_scopes = Object.keys(data)
      for(let i=0; i < total_scopes.length; i++) {
          tempObj = {
              name: total_scopes[i],
              y: Object.keys(data[total_scopes[i]]).length,
              drilldown: total_scopes[i]
          }
          newarr.push(tempObj)
      }
      return newarr
  }
  
  function categoryArray() {
      const nestedarr = []
      const total_scopes = Object.keys(data)
      let tempScope;
      let tempObj;
      let tempThird;
      let tempArr = [];
  
      for(let i=0; i < total_scopes.length; i++) {
          const nested = Object.keys(data[total_scopes[i]])
          tempScope = {
              name: total_scopes[i],
              id: total_scopes[i],
              data: []
          }
          nestedarr.push(tempScope)
          for(let j=0; j < nested.length; j++) {
              tempObj = {
                  name: nested[j],
                  y: data[total_scopes[i]][nested[j]].length,
                  drilldown: nested[j]
              }
              tempThird = {
                  name: nested[j],
                  id: nested[j],
                  data: data[total_scopes[i]][nested[j]]
              }
              tempArr.push(tempThird)
              nestedarr[i]["data"].push(tempObj)
          }
      }
      for(let k=0; k < tempArr.length; k++) {
          nestedarr.push(tempArr[k])
      }
      console.log(nestedarr)
      return nestedarr
  }
  
  // Create the chart
  Highcharts.chart('container', {
      chart: {
          type: 'pie'
      },
      title: {
          text: 'Salacia Programming Challenge',
          align: 'left'
        },
        
      
        accessibility: {
          announceNewData: {
            enabled: true
          },
          point: {
            valueSuffix: '%'
          }
        },
      
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: '{point.name}: {point.y:.1f}%'
            }
          }
        },
      
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
  
      series: [
          {
              name: 'Scopes',
              colorByPoint: true,
              data: scopesAray()
          }
      ],
      drilldown: {
          series: categoryArray()
      }
  });
  })
