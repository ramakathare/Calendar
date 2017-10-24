using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Calendar.Models
{
    public class CalendarBasicModel
    {
        public long id { get; set; }
        public string text { get; set; }
        public string start_date { get; set; }
        public string end_date { get; set; }
        public int type { get; set; }
        public string rec_type{get;set;}
        public long event_pid { get; set; }
        public long event_length{get;set;}
        public string rec_pattern { get; set; }
        public string attendees { get; set; }
        public string description { get; set; }
        public bool saved2DB { get; set; }
    }

    public class SelectObject
    {
        public int id { get; set; }
        public string value { get; set; }
        public string label { get; set; }
    }
}