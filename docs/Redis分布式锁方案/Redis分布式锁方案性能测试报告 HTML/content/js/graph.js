/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 4.0, "minX": 0.0, "maxY": 678.0, "series": [{"data": [[0.0, 4.0], [0.1, 9.0], [0.2, 10.0], [0.3, 12.0], [0.4, 13.0], [0.5, 14.0], [0.6, 14.0], [0.7, 15.0], [0.8, 15.0], [0.9, 15.0], [1.0, 16.0], [1.1, 16.0], [1.2, 16.0], [1.3, 16.0], [1.4, 17.0], [1.5, 17.0], [1.6, 17.0], [1.7, 17.0], [1.8, 18.0], [1.9, 18.0], [2.0, 18.0], [2.1, 18.0], [2.2, 18.0], [2.3, 18.0], [2.4, 18.0], [2.5, 18.0], [2.6, 18.0], [2.7, 19.0], [2.8, 19.0], [2.9, 19.0], [3.0, 19.0], [3.1, 19.0], [3.2, 19.0], [3.3, 19.0], [3.4, 19.0], [3.5, 19.0], [3.6, 19.0], [3.7, 19.0], [3.8, 19.0], [3.9, 20.0], [4.0, 20.0], [4.1, 20.0], [4.2, 20.0], [4.3, 20.0], [4.4, 20.0], [4.5, 20.0], [4.6, 20.0], [4.7, 20.0], [4.8, 20.0], [4.9, 20.0], [5.0, 20.0], [5.1, 20.0], [5.2, 20.0], [5.3, 20.0], [5.4, 20.0], [5.5, 20.0], [5.6, 20.0], [5.7, 21.0], [5.8, 21.0], [5.9, 21.0], [6.0, 21.0], [6.1, 21.0], [6.2, 21.0], [6.3, 21.0], [6.4, 21.0], [6.5, 21.0], [6.6, 21.0], [6.7, 21.0], [6.8, 21.0], [6.9, 21.0], [7.0, 21.0], [7.1, 21.0], [7.2, 21.0], [7.3, 21.0], [7.4, 21.0], [7.5, 21.0], [7.6, 21.0], [7.7, 21.0], [7.8, 21.0], [7.9, 21.0], [8.0, 22.0], [8.1, 22.0], [8.2, 22.0], [8.3, 22.0], [8.4, 22.0], [8.5, 22.0], [8.6, 22.0], [8.7, 22.0], [8.8, 22.0], [8.9, 22.0], [9.0, 22.0], [9.1, 22.0], [9.2, 22.0], [9.3, 22.0], [9.4, 22.0], [9.5, 22.0], [9.6, 22.0], [9.7, 22.0], [9.8, 22.0], [9.9, 22.0], [10.0, 22.0], [10.1, 22.0], [10.2, 22.0], [10.3, 22.0], [10.4, 22.0], [10.5, 22.0], [10.6, 22.0], [10.7, 23.0], [10.8, 23.0], [10.9, 23.0], [11.0, 23.0], [11.1, 23.0], [11.2, 23.0], [11.3, 23.0], [11.4, 23.0], [11.5, 23.0], [11.6, 23.0], [11.7, 23.0], [11.8, 23.0], [11.9, 23.0], [12.0, 23.0], [12.1, 23.0], [12.2, 23.0], [12.3, 23.0], [12.4, 23.0], [12.5, 23.0], [12.6, 23.0], [12.7, 23.0], [12.8, 23.0], [12.9, 23.0], [13.0, 23.0], [13.1, 23.0], [13.2, 23.0], [13.3, 24.0], [13.4, 24.0], [13.5, 24.0], [13.6, 24.0], [13.7, 24.0], [13.8, 24.0], [13.9, 24.0], [14.0, 24.0], [14.1, 24.0], [14.2, 24.0], [14.3, 24.0], [14.4, 24.0], [14.5, 24.0], [14.6, 24.0], [14.7, 24.0], [14.8, 24.0], [14.9, 24.0], [15.0, 24.0], [15.1, 24.0], [15.2, 24.0], [15.3, 24.0], [15.4, 24.0], [15.5, 25.0], [15.6, 25.0], [15.7, 25.0], [15.8, 25.0], [15.9, 25.0], [16.0, 25.0], [16.1, 25.0], [16.2, 25.0], [16.3, 25.0], [16.4, 25.0], [16.5, 25.0], [16.6, 25.0], [16.7, 25.0], [16.8, 25.0], [16.9, 25.0], [17.0, 25.0], [17.1, 25.0], [17.2, 25.0], [17.3, 25.0], [17.4, 25.0], [17.5, 26.0], [17.6, 26.0], [17.7, 26.0], [17.8, 26.0], [17.9, 26.0], [18.0, 26.0], [18.1, 26.0], [18.2, 26.0], [18.3, 26.0], [18.4, 26.0], [18.5, 26.0], [18.6, 26.0], [18.7, 26.0], [18.8, 26.0], [18.9, 26.0], [19.0, 27.0], [19.1, 27.0], [19.2, 27.0], [19.3, 27.0], [19.4, 27.0], [19.5, 27.0], [19.6, 27.0], [19.7, 27.0], [19.8, 27.0], [19.9, 27.0], [20.0, 27.0], [20.1, 27.0], [20.2, 27.0], [20.3, 28.0], [20.4, 28.0], [20.5, 28.0], [20.6, 28.0], [20.7, 28.0], [20.8, 28.0], [20.9, 28.0], [21.0, 28.0], [21.1, 28.0], [21.2, 28.0], [21.3, 28.0], [21.4, 28.0], [21.5, 29.0], [21.6, 29.0], [21.7, 29.0], [21.8, 29.0], [21.9, 29.0], [22.0, 29.0], [22.1, 29.0], [22.2, 30.0], [22.3, 30.0], [22.4, 30.0], [22.5, 30.0], [22.6, 30.0], [22.7, 30.0], [22.8, 31.0], [22.9, 31.0], [23.0, 31.0], [23.1, 31.0], [23.2, 32.0], [23.3, 32.0], [23.4, 32.0], [23.5, 33.0], [23.6, 33.0], [23.7, 33.0], [23.8, 33.0], [23.9, 34.0], [24.0, 34.0], [24.1, 34.0], [24.2, 34.0], [24.3, 34.0], [24.4, 35.0], [24.5, 35.0], [24.6, 35.0], [24.7, 35.0], [24.8, 35.0], [24.9, 35.0], [25.0, 35.0], [25.1, 35.0], [25.2, 35.0], [25.3, 35.0], [25.4, 36.0], [25.5, 36.0], [25.6, 36.0], [25.7, 36.0], [25.8, 36.0], [25.9, 36.0], [26.0, 36.0], [26.1, 36.0], [26.2, 36.0], [26.3, 36.0], [26.4, 36.0], [26.5, 36.0], [26.6, 36.0], [26.7, 36.0], [26.8, 36.0], [26.9, 37.0], [27.0, 37.0], [27.1, 37.0], [27.2, 37.0], [27.3, 37.0], [27.4, 37.0], [27.5, 37.0], [27.6, 37.0], [27.7, 37.0], [27.8, 37.0], [27.9, 37.0], [28.0, 37.0], [28.1, 37.0], [28.2, 37.0], [28.3, 37.0], [28.4, 37.0], [28.5, 37.0], [28.6, 37.0], [28.7, 37.0], [28.8, 37.0], [28.9, 37.0], [29.0, 37.0], [29.1, 37.0], [29.2, 37.0], [29.3, 38.0], [29.4, 38.0], [29.5, 38.0], [29.6, 38.0], [29.7, 38.0], [29.8, 38.0], [29.9, 38.0], [30.0, 38.0], [30.1, 38.0], [30.2, 38.0], [30.3, 38.0], [30.4, 38.0], [30.5, 38.0], [30.6, 38.0], [30.7, 38.0], [30.8, 38.0], [30.9, 38.0], [31.0, 38.0], [31.1, 38.0], [31.2, 38.0], [31.3, 38.0], [31.4, 38.0], [31.5, 38.0], [31.6, 38.0], [31.7, 38.0], [31.8, 38.0], [31.9, 38.0], [32.0, 38.0], [32.1, 38.0], [32.2, 38.0], [32.3, 38.0], [32.4, 38.0], [32.5, 38.0], [32.6, 38.0], [32.7, 38.0], [32.8, 38.0], [32.9, 38.0], [33.0, 38.0], [33.1, 38.0], [33.2, 39.0], [33.3, 39.0], [33.4, 39.0], [33.5, 39.0], [33.6, 39.0], [33.7, 39.0], [33.8, 39.0], [33.9, 39.0], [34.0, 39.0], [34.1, 39.0], [34.2, 39.0], [34.3, 39.0], [34.4, 39.0], [34.5, 39.0], [34.6, 39.0], [34.7, 39.0], [34.8, 39.0], [34.9, 39.0], [35.0, 39.0], [35.1, 39.0], [35.2, 39.0], [35.3, 39.0], [35.4, 39.0], [35.5, 39.0], [35.6, 39.0], [35.7, 39.0], [35.8, 39.0], [35.9, 39.0], [36.0, 39.0], [36.1, 39.0], [36.2, 39.0], [36.3, 39.0], [36.4, 39.0], [36.5, 39.0], [36.6, 39.0], [36.7, 39.0], [36.8, 39.0], [36.9, 39.0], [37.0, 39.0], [37.1, 39.0], [37.2, 39.0], [37.3, 39.0], [37.4, 39.0], [37.5, 39.0], [37.6, 39.0], [37.7, 39.0], [37.8, 39.0], [37.9, 39.0], [38.0, 40.0], [38.1, 40.0], [38.2, 40.0], [38.3, 40.0], [38.4, 40.0], [38.5, 40.0], [38.6, 40.0], [38.7, 40.0], [38.8, 40.0], [38.9, 40.0], [39.0, 40.0], [39.1, 40.0], [39.2, 40.0], [39.3, 40.0], [39.4, 40.0], [39.5, 40.0], [39.6, 40.0], [39.7, 40.0], [39.8, 40.0], [39.9, 40.0], [40.0, 40.0], [40.1, 40.0], [40.2, 40.0], [40.3, 40.0], [40.4, 40.0], [40.5, 40.0], [40.6, 40.0], [40.7, 40.0], [40.8, 40.0], [40.9, 40.0], [41.0, 40.0], [41.1, 40.0], [41.2, 40.0], [41.3, 40.0], [41.4, 40.0], [41.5, 40.0], [41.6, 40.0], [41.7, 40.0], [41.8, 40.0], [41.9, 40.0], [42.0, 40.0], [42.1, 40.0], [42.2, 40.0], [42.3, 40.0], [42.4, 40.0], [42.5, 40.0], [42.6, 40.0], [42.7, 40.0], [42.8, 40.0], [42.9, 40.0], [43.0, 40.0], [43.1, 40.0], [43.2, 40.0], [43.3, 40.0], [43.4, 40.0], [43.5, 40.0], [43.6, 40.0], [43.7, 40.0], [43.8, 40.0], [43.9, 40.0], [44.0, 40.0], [44.1, 41.0], [44.2, 41.0], [44.3, 41.0], [44.4, 41.0], [44.5, 41.0], [44.6, 41.0], [44.7, 41.0], [44.8, 41.0], [44.9, 41.0], [45.0, 41.0], [45.1, 41.0], [45.2, 41.0], [45.3, 41.0], [45.4, 41.0], [45.5, 41.0], [45.6, 41.0], [45.7, 41.0], [45.8, 41.0], [45.9, 41.0], [46.0, 41.0], [46.1, 41.0], [46.2, 41.0], [46.3, 41.0], [46.4, 41.0], [46.5, 41.0], [46.6, 41.0], [46.7, 41.0], [46.8, 41.0], [46.9, 41.0], [47.0, 41.0], [47.1, 41.0], [47.2, 41.0], [47.3, 41.0], [47.4, 41.0], [47.5, 41.0], [47.6, 41.0], [47.7, 41.0], [47.8, 41.0], [47.9, 41.0], [48.0, 41.0], [48.1, 41.0], [48.2, 41.0], [48.3, 41.0], [48.4, 41.0], [48.5, 41.0], [48.6, 41.0], [48.7, 41.0], [48.8, 41.0], [48.9, 41.0], [49.0, 41.0], [49.1, 41.0], [49.2, 41.0], [49.3, 41.0], [49.4, 41.0], [49.5, 41.0], [49.6, 41.0], [49.7, 41.0], [49.8, 41.0], [49.9, 41.0], [50.0, 41.0], [50.1, 41.0], [50.2, 41.0], [50.3, 41.0], [50.4, 41.0], [50.5, 41.0], [50.6, 42.0], [50.7, 42.0], [50.8, 42.0], [50.9, 42.0], [51.0, 42.0], [51.1, 42.0], [51.2, 42.0], [51.3, 42.0], [51.4, 42.0], [51.5, 42.0], [51.6, 42.0], [51.7, 42.0], [51.8, 42.0], [51.9, 42.0], [52.0, 42.0], [52.1, 42.0], [52.2, 42.0], [52.3, 42.0], [52.4, 42.0], [52.5, 42.0], [52.6, 42.0], [52.7, 42.0], [52.8, 42.0], [52.9, 42.0], [53.0, 42.0], [53.1, 42.0], [53.2, 42.0], [53.3, 42.0], [53.4, 42.0], [53.5, 42.0], [53.6, 42.0], [53.7, 42.0], [53.8, 42.0], [53.9, 42.0], [54.0, 42.0], [54.1, 42.0], [54.2, 42.0], [54.3, 42.0], [54.4, 42.0], [54.5, 42.0], [54.6, 42.0], [54.7, 42.0], [54.8, 42.0], [54.9, 42.0], [55.0, 42.0], [55.1, 42.0], [55.2, 42.0], [55.3, 42.0], [55.4, 42.0], [55.5, 42.0], [55.6, 42.0], [55.7, 42.0], [55.8, 42.0], [55.9, 42.0], [56.0, 42.0], [56.1, 42.0], [56.2, 42.0], [56.3, 42.0], [56.4, 42.0], [56.5, 42.0], [56.6, 42.0], [56.7, 42.0], [56.8, 42.0], [56.9, 42.0], [57.0, 42.0], [57.1, 43.0], [57.2, 43.0], [57.3, 43.0], [57.4, 43.0], [57.5, 43.0], [57.6, 43.0], [57.7, 43.0], [57.8, 43.0], [57.9, 43.0], [58.0, 43.0], [58.1, 43.0], [58.2, 43.0], [58.3, 43.0], [58.4, 43.0], [58.5, 43.0], [58.6, 43.0], [58.7, 43.0], [58.8, 43.0], [58.9, 43.0], [59.0, 43.0], [59.1, 43.0], [59.2, 43.0], [59.3, 43.0], [59.4, 43.0], [59.5, 43.0], [59.6, 43.0], [59.7, 43.0], [59.8, 43.0], [59.9, 43.0], [60.0, 43.0], [60.1, 43.0], [60.2, 43.0], [60.3, 43.0], [60.4, 43.0], [60.5, 43.0], [60.6, 43.0], [60.7, 43.0], [60.8, 43.0], [60.9, 43.0], [61.0, 43.0], [61.1, 43.0], [61.2, 43.0], [61.3, 43.0], [61.4, 43.0], [61.5, 43.0], [61.6, 43.0], [61.7, 43.0], [61.8, 43.0], [61.9, 43.0], [62.0, 43.0], [62.1, 43.0], [62.2, 43.0], [62.3, 43.0], [62.4, 43.0], [62.5, 43.0], [62.6, 43.0], [62.7, 43.0], [62.8, 43.0], [62.9, 43.0], [63.0, 43.0], [63.1, 43.0], [63.2, 43.0], [63.3, 43.0], [63.4, 43.0], [63.5, 44.0], [63.6, 44.0], [63.7, 44.0], [63.8, 44.0], [63.9, 44.0], [64.0, 44.0], [64.1, 44.0], [64.2, 44.0], [64.3, 44.0], [64.4, 44.0], [64.5, 44.0], [64.6, 44.0], [64.7, 44.0], [64.8, 44.0], [64.9, 44.0], [65.0, 44.0], [65.1, 44.0], [65.2, 44.0], [65.3, 44.0], [65.4, 44.0], [65.5, 44.0], [65.6, 44.0], [65.7, 44.0], [65.8, 44.0], [65.9, 44.0], [66.0, 44.0], [66.1, 44.0], [66.2, 44.0], [66.3, 44.0], [66.4, 44.0], [66.5, 44.0], [66.6, 44.0], [66.7, 44.0], [66.8, 44.0], [66.9, 44.0], [67.0, 44.0], [67.1, 44.0], [67.2, 44.0], [67.3, 44.0], [67.4, 44.0], [67.5, 44.0], [67.6, 44.0], [67.7, 44.0], [67.8, 44.0], [67.9, 44.0], [68.0, 44.0], [68.1, 44.0], [68.2, 44.0], [68.3, 44.0], [68.4, 44.0], [68.5, 44.0], [68.6, 44.0], [68.7, 44.0], [68.8, 44.0], [68.9, 44.0], [69.0, 44.0], [69.1, 45.0], [69.2, 45.0], [69.3, 45.0], [69.4, 45.0], [69.5, 45.0], [69.6, 45.0], [69.7, 45.0], [69.8, 45.0], [69.9, 45.0], [70.0, 45.0], [70.1, 45.0], [70.2, 45.0], [70.3, 45.0], [70.4, 45.0], [70.5, 45.0], [70.6, 45.0], [70.7, 45.0], [70.8, 45.0], [70.9, 45.0], [71.0, 45.0], [71.1, 45.0], [71.2, 45.0], [71.3, 45.0], [71.4, 45.0], [71.5, 45.0], [71.6, 45.0], [71.7, 45.0], [71.8, 45.0], [71.9, 45.0], [72.0, 45.0], [72.1, 45.0], [72.2, 45.0], [72.3, 45.0], [72.4, 45.0], [72.5, 45.0], [72.6, 45.0], [72.7, 45.0], [72.8, 45.0], [72.9, 45.0], [73.0, 45.0], [73.1, 45.0], [73.2, 45.0], [73.3, 45.0], [73.4, 45.0], [73.5, 45.0], [73.6, 45.0], [73.7, 45.0], [73.8, 45.0], [73.9, 45.0], [74.0, 45.0], [74.1, 45.0], [74.2, 45.0], [74.3, 45.0], [74.4, 46.0], [74.5, 46.0], [74.6, 46.0], [74.7, 46.0], [74.8, 46.0], [74.9, 46.0], [75.0, 46.0], [75.1, 46.0], [75.2, 46.0], [75.3, 46.0], [75.4, 46.0], [75.5, 46.0], [75.6, 46.0], [75.7, 46.0], [75.8, 46.0], [75.9, 46.0], [76.0, 46.0], [76.1, 46.0], [76.2, 46.0], [76.3, 46.0], [76.4, 46.0], [76.5, 46.0], [76.6, 46.0], [76.7, 46.0], [76.8, 46.0], [76.9, 46.0], [77.0, 46.0], [77.1, 46.0], [77.2, 46.0], [77.3, 46.0], [77.4, 46.0], [77.5, 46.0], [77.6, 46.0], [77.7, 46.0], [77.8, 46.0], [77.9, 46.0], [78.0, 46.0], [78.1, 46.0], [78.2, 46.0], [78.3, 46.0], [78.4, 46.0], [78.5, 46.0], [78.6, 46.0], [78.7, 46.0], [78.8, 46.0], [78.9, 46.0], [79.0, 46.0], [79.1, 47.0], [79.2, 47.0], [79.3, 47.0], [79.4, 47.0], [79.5, 47.0], [79.6, 47.0], [79.7, 47.0], [79.8, 47.0], [79.9, 47.0], [80.0, 47.0], [80.1, 47.0], [80.2, 47.0], [80.3, 47.0], [80.4, 47.0], [80.5, 47.0], [80.6, 47.0], [80.7, 47.0], [80.8, 47.0], [80.9, 47.0], [81.0, 47.0], [81.1, 47.0], [81.2, 47.0], [81.3, 47.0], [81.4, 47.0], [81.5, 47.0], [81.6, 47.0], [81.7, 47.0], [81.8, 47.0], [81.9, 47.0], [82.0, 47.0], [82.1, 47.0], [82.2, 47.0], [82.3, 47.0], [82.4, 47.0], [82.5, 47.0], [82.6, 47.0], [82.7, 47.0], [82.8, 47.0], [82.9, 47.0], [83.0, 47.0], [83.1, 47.0], [83.2, 47.0], [83.3, 47.0], [83.4, 47.0], [83.5, 47.0], [83.6, 48.0], [83.7, 48.0], [83.8, 48.0], [83.9, 48.0], [84.0, 48.0], [84.1, 48.0], [84.2, 48.0], [84.3, 48.0], [84.4, 48.0], [84.5, 48.0], [84.6, 48.0], [84.7, 48.0], [84.8, 48.0], [84.9, 48.0], [85.0, 48.0], [85.1, 48.0], [85.2, 48.0], [85.3, 48.0], [85.4, 48.0], [85.5, 48.0], [85.6, 48.0], [85.7, 48.0], [85.8, 48.0], [85.9, 48.0], [86.0, 48.0], [86.1, 48.0], [86.2, 48.0], [86.3, 48.0], [86.4, 48.0], [86.5, 48.0], [86.6, 48.0], [86.7, 48.0], [86.8, 48.0], [86.9, 48.0], [87.0, 48.0], [87.1, 49.0], [87.2, 49.0], [87.3, 49.0], [87.4, 49.0], [87.5, 49.0], [87.6, 49.0], [87.7, 49.0], [87.8, 49.0], [87.9, 49.0], [88.0, 49.0], [88.1, 49.0], [88.2, 49.0], [88.3, 49.0], [88.4, 49.0], [88.5, 49.0], [88.6, 49.0], [88.7, 49.0], [88.8, 49.0], [88.9, 49.0], [89.0, 49.0], [89.1, 49.0], [89.2, 49.0], [89.3, 49.0], [89.4, 49.0], [89.5, 49.0], [89.6, 49.0], [89.7, 49.0], [89.8, 49.0], [89.9, 50.0], [90.0, 50.0], [90.1, 50.0], [90.2, 50.0], [90.3, 50.0], [90.4, 50.0], [90.5, 50.0], [90.6, 50.0], [90.7, 50.0], [90.8, 50.0], [90.9, 50.0], [91.0, 50.0], [91.1, 50.0], [91.2, 50.0], [91.3, 50.0], [91.4, 50.0], [91.5, 50.0], [91.6, 50.0], [91.7, 50.0], [91.8, 50.0], [91.9, 50.0], [92.0, 51.0], [92.1, 51.0], [92.2, 51.0], [92.3, 51.0], [92.4, 51.0], [92.5, 51.0], [92.6, 51.0], [92.7, 51.0], [92.8, 51.0], [92.9, 51.0], [93.0, 51.0], [93.1, 51.0], [93.2, 51.0], [93.3, 51.0], [93.4, 51.0], [93.5, 51.0], [93.6, 52.0], [93.7, 52.0], [93.8, 52.0], [93.9, 52.0], [94.0, 52.0], [94.1, 52.0], [94.2, 52.0], [94.3, 52.0], [94.4, 52.0], [94.5, 52.0], [94.6, 52.0], [94.7, 53.0], [94.8, 53.0], [94.9, 53.0], [95.0, 53.0], [95.1, 53.0], [95.2, 53.0], [95.3, 53.0], [95.4, 54.0], [95.5, 54.0], [95.6, 54.0], [95.7, 54.0], [95.8, 54.0], [95.9, 55.0], [96.0, 55.0], [96.1, 55.0], [96.2, 55.0], [96.3, 56.0], [96.4, 56.0], [96.5, 56.0], [96.6, 57.0], [96.7, 57.0], [96.8, 58.0], [96.9, 58.0], [97.0, 58.0], [97.1, 59.0], [97.2, 60.0], [97.3, 61.0], [97.4, 62.0], [97.5, 63.0], [97.6, 64.0], [97.7, 66.0], [97.8, 67.0], [97.9, 68.0], [98.0, 69.0], [98.1, 70.0], [98.2, 71.0], [98.3, 72.0], [98.4, 73.0], [98.5, 75.0], [98.6, 77.0], [98.7, 78.0], [98.8, 79.0], [98.9, 81.0], [99.0, 84.0], [99.1, 86.0], [99.2, 89.0], [99.3, 91.0], [99.4, 93.0], [99.5, 96.0], [99.6, 99.0], [99.7, 104.0], [99.8, 123.0], [99.9, 145.0]], "isOverall": false, "label": "transfer 随机用户", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 2.0, "minX": 0.0, "maxY": 39845.0, "series": [{"data": [[0.0, 39845.0], [600.0, 2.0], [300.0, 4.0], [400.0, 2.0], [100.0, 143.0], [200.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "transfer 随机用户", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 600.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 4.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 39996.0, "series": [{"data": [[0.0, 39996.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 4.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 19.93032202906811, "minX": 1.73635362E12, "maxY": 19.984741784037464, "series": [{"data": [[1.73635362E12, 19.984741784037464], [1.73635368E12, 19.93032202906811]], "isOverall": false, "label": "新版 transfer", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73635368E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 9.125, "minX": 1.0, "maxY": 217.84999999999997, "series": [{"data": [[8.0, 16.333333333333332], [2.0, 26.0], [9.0, 12.5], [10.0, 24.437500000000007], [11.0, 22.555555555555557], [12.0, 37.0], [3.0, 9.125], [13.0, 33.16129032258064], [14.0, 217.84999999999997], [15.0, 42.076923076923066], [16.0, 61.132075471698116], [4.0, 18.75], [1.0, 10.714285714285715], [17.0, 43.85964912280699], [18.0, 78.33333333333333], [19.0, 47.68478260869565], [20.0, 39.721216710842185], [5.0, 10.0], [6.0, 25.333333333333332], [7.0, 15.624999999999998]], "isOverall": false, "label": "transfer 随机用户", "isController": false}, {"data": [[19.946549999999778, 39.82262499999979]], "isOverall": false, "label": "transfer 随机用户-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 20.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 45474.933333333334, "minX": 1.73635362E12, "maxY": 152917.88333333333, "series": [{"data": [[1.73635362E12, 45474.933333333334], [1.73635368E12, 106998.4]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.73635362E12, 64974.833333333336], [1.73635368E12, 152917.88333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73635368E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 39.01474779139378, "minX": 1.73635362E12, "maxY": 41.72392689470128, "series": [{"data": [[1.73635362E12, 41.72392689470128], [1.73635368E12, 39.01474779139378]], "isOverall": false, "label": "transfer 随机用户", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73635368E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 39.00887004844682, "minX": 1.73635362E12, "maxY": 41.71847753185771, "series": [{"data": [[1.73635362E12, 41.71847753185771], [1.73635368E12, 39.00887004844682]], "isOverall": false, "label": "transfer 随机用户", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73635368E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0030991735537190222, "minX": 1.73635362E12, "maxY": 0.003940308517773328, "series": [{"data": [[1.73635362E12, 0.003940308517773328], [1.73635368E12, 0.0030991735537190222]], "isOverall": false, "label": "transfer 随机用户", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73635368E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 4.0, "minX": 1.73635362E12, "maxY": 678.0, "series": [{"data": [[1.73635362E12, 678.0], [1.73635368E12, 158.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.73635362E12, 52.0], [1.73635368E12, 50.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.73635362E12, 85.0], [1.73635368E12, 91.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.73635362E12, 59.0], [1.73635368E12, 52.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.73635362E12, 4.0], [1.73635368E12, 4.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.73635362E12, 42.0], [1.73635368E12, 43.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73635368E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 37.0, "minX": 70.0, "maxY": 86.5, "series": [{"data": [[537.0, 40.0], [527.0, 40.0], [512.0, 42.0], [522.0, 40.0], [535.0, 40.0], [516.0, 41.0], [514.0, 41.0], [540.0, 40.0], [528.0, 41.0], [533.0, 41.0], [571.0, 39.0], [563.0, 39.0], [558.0, 39.0], [573.0, 39.0], [572.0, 38.0], [560.0, 39.0], [552.0, 39.0], [569.0, 39.0], [570.0, 38.5], [555.0, 39.0], [554.0, 40.0], [553.0, 40.0], [564.0, 38.0], [566.0, 39.0], [547.0, 40.0], [544.0, 39.0], [548.0, 39.0], [584.0, 38.0], [583.0, 38.0], [578.0, 38.0], [582.0, 38.0], [581.0, 38.0], [580.0, 37.0], [585.0, 38.0], [70.0, 86.5], [301.0, 63.0], [299.0, 55.0], [317.0, 55.0], [311.0, 48.0], [335.0, 38.0], [342.0, 55.0], [383.0, 47.0], [386.0, 47.0], [397.0, 44.0], [401.0, 50.0], [406.0, 46.0], [407.0, 46.0], [404.0, 49.0], [421.0, 48.0], [416.0, 48.0], [430.0, 47.0], [423.0, 46.0], [428.0, 47.0], [427.0, 47.0], [440.0, 45.0], [446.0, 45.0], [447.0, 46.0], [443.0, 46.0], [442.0, 46.0], [444.0, 46.0], [452.0, 45.0], [459.0, 46.0], [453.0, 45.0], [456.0, 45.0], [448.0, 46.0], [457.0, 45.0], [477.0, 44.0], [482.0, 43.0], [492.0, 43.0], [481.0, 43.0], [502.0, 42.0], [498.0, 42.0], [510.0, 40.0], [508.0, 41.0], [496.0, 43.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 585.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 37.0, "minX": 70.0, "maxY": 86.5, "series": [{"data": [[537.0, 40.0], [527.0, 40.0], [512.0, 42.0], [522.0, 40.0], [535.0, 40.0], [516.0, 41.0], [514.0, 41.0], [540.0, 40.0], [528.0, 41.0], [533.0, 41.0], [571.0, 39.0], [563.0, 39.0], [558.0, 39.0], [573.0, 39.0], [572.0, 38.0], [560.0, 39.0], [552.0, 39.0], [569.0, 39.0], [570.0, 38.0], [555.0, 39.0], [554.0, 40.0], [553.0, 40.0], [564.0, 38.0], [566.0, 39.0], [547.0, 40.0], [544.0, 39.0], [548.0, 39.0], [584.0, 38.0], [583.0, 38.0], [578.0, 38.0], [582.0, 38.0], [581.0, 38.0], [580.0, 37.0], [585.0, 38.0], [70.0, 86.5], [301.0, 63.0], [299.0, 55.0], [317.0, 55.0], [311.0, 48.0], [335.0, 38.0], [342.0, 55.0], [383.0, 47.0], [386.0, 47.0], [397.0, 44.0], [401.0, 50.0], [406.0, 46.0], [407.0, 46.0], [404.0, 49.0], [421.0, 48.0], [416.0, 48.0], [430.0, 47.0], [423.0, 46.0], [428.0, 47.0], [427.0, 47.0], [440.0, 45.0], [446.0, 45.0], [447.0, 46.0], [443.0, 46.0], [442.0, 46.0], [444.0, 46.0], [452.0, 45.0], [459.0, 46.0], [453.0, 45.0], [456.0, 45.0], [448.0, 46.0], [457.0, 45.0], [477.0, 44.0], [482.0, 43.0], [492.0, 43.0], [481.0, 43.0], [502.0, 42.0], [498.0, 42.0], [510.0, 40.0], [508.0, 41.0], [496.0, 43.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 585.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 199.13333333333333, "minX": 1.73635362E12, "maxY": 467.53333333333336, "series": [{"data": [[1.73635362E12, 199.13333333333333], [1.73635368E12, 467.53333333333336]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73635368E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 198.8, "minX": 1.73635362E12, "maxY": 467.8666666666667, "series": [{"data": [[1.73635362E12, 198.8], [1.73635368E12, 467.8666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.73635368E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 198.8, "minX": 1.73635362E12, "maxY": 467.8666666666667, "series": [{"data": [[1.73635362E12, 198.8], [1.73635368E12, 467.8666666666667]], "isOverall": false, "label": "transfer 随机用户-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73635368E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 198.8, "minX": 1.73635362E12, "maxY": 467.8666666666667, "series": [{"data": [[1.73635362E12, 198.8], [1.73635368E12, 467.8666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.73635368E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

