var fpath = 'static/data/samples.json';

var names = [];
var metadata = [];
var samples = [];

d3.json(fpath).then(function (data) {

    for (var i = 0; i < data.names.length; i++) {
        names.push(data.names[i]);
    }
    for (var i = 0; i < data.metadata.length; i++) {
        metadata.push(data.metadata[i]);
    }
    for (var i = 0; i < data.samples.length; i++) {
        samples.push(data.samples[i]);
    }

    d3.select('#selDataset')
        .selectAll('nameOptions')
        .data(data.names)
        .enter()
        .append('option')
        .text(function (d) { return d });
    
    optionChanged(names[0]);

});

function optionChanged() {
    var dropdownMenu = d3.selectAll('#selDataset');
    var tsID = dropdownMenu.property('value');
    updateDemographics(tsID);
    updateBarChart(tsID);
    updateBubbleChart(tsID);
};

function updateBubbleChart(tsID) {
    var d = samples.filter(d => { return d["id"] == tsID });

    var vals = d[0].sample_values;
    var ids = d[0].otu_ids;
    var labels = d[0].otu_labels;

    var x = [];
    var y = [];
    var txt = [];

    for (var i = 0; i < vals.length; i++) {
        y.push(vals[i]);
        x.push(ids[i]);
        txt.push(labels[i]);
    }

    colors = [];
    for(i = 0; i<x.length; i++){
        colors.push(colorPicker(x[i], Math.max(...x)));
    }

    var trace1 = {
        x: x,
        y: y,
        mode: 'markers',
        text: txt,
        marker: {
            size: y,
            color: colors
        }
    };

    var data = [trace1];

    console.log(colors);

    var layout = {
        title: 'Bacteria Cultures per Sample',
        showlegend: false,
        autosize: true
    };
    Plotly.newPlot('bubble', data, layout);
}

function colorPicker(id, max) {
    var scaledID = 10*id/max;
    console.log(scaledID);

    switch(true){
        case scaledID > 9: return "#1e6171";
        case scaledID > 7: return "#008c8b";
        case scaledID > 5: return "#3db68d";
        case scaledID > 3: return "#94dc7d";
        case scaledID > 1: return "#fafa6e";
        default: return "#ff000";
    }
}

function updateBarChart(tsID) {
    var d = samples.filter(d => { return d["id"] == tsID });
    var vals = d[0].sample_values;
    var ids = d[0].otu_ids;
    var labels = d[0].otu_labels;
    var x = [];
    var y = [];
    var txt = [];
    for (var i = 0; i < 10; i++) {
        x.push(vals[i]);
        y.push("OTU " + ids[i]);
        txt.push(labels[i]);
    }


    // console.log(y);
    // console.log(x);

    var data = [{
        type: 'bar',
        x: x.reverse(),
        y: y.reverse(),
        orientation: 'h',
        text: txt
    }];

    var layout = {
        title: 'Top 10 Bacteria Cultures Found',
        showlegend: false
    };

    Plotly.newPlot("bar", data, layout);
}
function updateDemographics(tsID) {
    var data = metadata.filter(data => { return data["id"] == tsID })

    d3.select('.panel-body').selectAll('div').remove()

    var panel = d3.select('#sample-metadata')
        .selectAll('panels').data(data).enter()
    panel.append('div')
        .text(function (d) {
            var tsID = ("ID: " + d.id);
            return tsID
        })
    panel.append('div')
        .text(function (d) {
            var ethnicity = ("Ethnicity: " + d.ethnicity);
            return ethnicity
        })
    panel.append('div')
        .text(function (d) {
            var gender = ("Gender: " + d.gender);
            return gender
        })
    panel.append('div')
        .text(function (d) {
            var age = ("Age: " + d.age);
            return age
        })
    panel.append('div')
        .text(function (d) {
            var location = ("Location: " + d.location);
            return location
        })
    panel.append('div')
        .text(function (d) {
            var bbtype = ("bbtype: " + d.bbtype);
            return bbtype
        })
    panel.append('div')
        .text(function (d) {
            var wfreq = ("wfreq: " + d.wfreq);
            return wfreq
        })
};
