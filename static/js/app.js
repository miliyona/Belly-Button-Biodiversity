function buildMetadata(sample) {

        // @TODO: Complete the following function that builds the metadata panel
        // Use d3 to select the panel with id of `#sample-metadata`
        // Use `d3.json` to fetch the metadata for a sample
        // Use `.html("") to clear any existing metadata
        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        // Use `Object.entries` to add each key and value pair to the panel
        // Hint: Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
    d3.json("/metadata/" + sample).then(response => {
        var selector = d3.select("#sample-metadata");
        selector.html("");
        objectEntries=Object.entries(response);
        for (i=0; i<objectEntries.length; i++){
        selector.append("p").text(objectEntries[i][0] + ": " + objectEntries[i][1]);
        }
        // BONUS: Build the Gauge Chart
        console.log(response.WFREQ);
        buildGauge(response.WFREQ);
    })
    }
  
  function buildCharts(sample) {
  
// @TODO: Use `d3.json` to fetch the sample data for the plots
// console.log(response);
// @TODO: Build a Bubble Chart using the sample data
// @TODO: Build a Pie Chart
// HINT: You will need to use slice() to grab the top 10 sample_values,
// otu_ids, and labels (10 each).

      d3.json("/samples/" + sample).then(response => {
        var trace1 = {
            x: response.otu_ids,
            y: response.sample_values,
            text: response.otu_labels,
            mode: 'markers',
            marker: {
            color: response.otu_ids,
            size: response.sample_values
            }
        };
        
        var data = [trace1];
            var layout = {
            height: 500,
            width: 500
        };
        
        Plotly.newPlot('bubble', data, layout);
  
        
        var data = [{
          values: response.sample_values.slice(0,9),
          labels: response.otu_ids.slice(0,9),
          text: response.otu_labels.slice(0,9),
          type: 'pie'
        }];
        
        var layout = {
            height: 500,
            width: 500
        };
                
        Plotly.newPlot('pie', data, layout);
  
    });
  }
  
function init() {
    // Grab a reference to the dropdown select element
    // Use the list of sample names to populate the select options
    // Use the first sample from the list to build the initial plots
    // Fetch new data each time a new sample is selected
    // Initialize the dashboard
    var selector = d3.select("#selDataset");
    d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
        selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    });
}
    function optionChanged(newSample) {
        buildCharts(newSample);
        buildMetadata(newSample);
        }

  init();