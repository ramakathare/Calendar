//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;

namespace Calendar.Data
{
    public partial class CalendarEvent
    {
        public long id { get; set; }
        public string text { get; set; }
        public string location { get; set; }
        public System.DateTime start_date { get; set; }
        public System.DateTime end_date { get; set; }
        public string type { get; set; }
        public string description { get; set; }
        public string rec_type { get; set; }
        public Nullable<long> event_length { get; set; }
        public Nullable<long> event_pid { get; set; }
        public string rec_pattern { get; set; }
        public string attendees { get; set; }
        public byte[] agenda { get; set; }
    }
    
}
