using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Net.Mail;
using System.Data;
using System.Security.Cryptography.X509Certificates;
using Calendar.Models;
using System.Text;

namespace Calendar
{
    public static class Helpers
    {
        public static IEnumerable<T> Select<T>(this IDataReader reader,
                                       Func<IDataReader, T> projection)
        {
            while (reader.Read())
            {
                yield return projection(reader);
            }
        }
        public static string GetSMTPHostName()
        {
            return "smtp.sendgrid.net";
        }
        //Get Outgoing email server settings
        public static string GetFromEmailID()
        {
            return "shadow.kathare@gmail.com";
        }

        public static DateTime UnixTimeStampToDateTime(long unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0);
            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp);
            var ts = DateTime.Now - DateTime.UtcNow;
            string oper = ts.ToString().Substring(0, 1);
            string time = ts.ToString().Substring(1);
            double seconds = TimeSpan.Parse(time).TotalSeconds;
            if (oper == "-") seconds = 0 - seconds;
            dtDateTime = dtDateTime.AddSeconds(seconds);
            return dtDateTime;
        }

        //returns the appropriate line 
        public static string getConvertType(string i)
        {
            if (i == "day") return "DAILY";
            if (i == "week") return "WEEKLY";
            if (i == "month") return "MONTHLY";
            if (i == "year") return "YEARLY";
            else return "";
        }

        //returns the string value of the day instead of its ordinal number
        public static string getConvertDay(string i) {
            int j = 0;
            try{
                j = Int32.Parse(i);
            }catch{
            }
		    string[] x = {"SU","MO","TU","WE","TH","FR","SA"};
			return x[j];
        }

        //returns the strings value of the days instead of its ordinal numbers
        public static string getConvertDays(string n) {
		    string[] a = n.Split(',');
		    string str = "";
		    for(int i=0;i<a.Length;i++) {
			    str += getConvertDay(a[i]);
			    if(i != a.Length-1) {str += ","; }
		    }
		    return str;
	    }

        //get iCal rrule for recurrence events
        public static string getRrule(CalendarBasicModel ev) {
		    string[] mas = ev.rec_type.Split('#');
		    string[] a = mas[0].Split('_');
		
		    string type = "FREQ="+getConvertType(a[0])+";";
		    string interval = "INTERVAL="+a[1]+";";
            string count = "";
            string count2 = "";
            string day = "";
            string days = "";
            string byday = "";
            string until = "";

		    if(mas[1] != "no") { count = "COUNT="+mas[1]+";"; } else { count = ""; }
		    count2 = a[3];
		    if(a[2] != "") { day = getConvertDay(a[2]); } else { day = ""; }
		    if(a[4] != "") { days = getConvertDays(a[4]); } else { days = ""; }
		    if(day != "" && count2 != "") {
			    byday = "BYDAY="+count2+""+day+";";
		    }
		    else if(days != "") {
			    byday = "BYDAY="+days+";";
		    }
		    else {
			    byday = "";
		    }
		    string end_date = DateTime.Parse(ev.end_date).ToString(d.format);
		    if(end_date.Substring(0, 4) != "9999") { until = "UNTIL="+end_date+";"; } else { until = ""; };
		    return type+""+interval+""+count+""+byday+""+until;
        }

        //returns a string of remote events
        public static string getExdate(long id, CalendarBasicModel c) {
		    string a="0";
		    if(id == c.event_pid && c.rec_type == "none") {
			        a = UnixTimeStampToDateTime(c.event_length).ToString(d.format);
		    }
            return a;
	    }

        //php explode alternative in c# for split
        public static string[] explode(char ch, string item){
            return item.Split(ch);
        }

        public static class d
        {
            public const string format = "yyyyMMddTHHmmss";
        }

        //get date in icalendater format
        public static string getStartTimeevent(CalendarBasicModel ev)
        {
            string[] mas =ev.rec_type.Split('#');
            string[] arr =mas[0].Split('_');
            int n=0;
            int day=0;

		    switch(arr[0]) {
			    case "day":
				    return DateTime.Parse(ev.start_date).ToString(d.format);
			    case "week":
				    string[] diff = explode(',',arr[4]);
				    if(diff[0] == "0") { 
					    n = 7;
				    }
				    else {
					    n = Convert.ToInt32(diff[0]);
				    }

				    day = DateTime.Parse(ev.start_date).Day + n;
                    string dayString = day.ToString();
				    if(day < 10) { dayString = "0"+dayString; }

				    return DateTime.Parse(ev.start_date).ToString("yyyyMM")+dayString+"T"+DateTime.Parse(ev.start_date).ToString("HHmmss");
				
			    case "month":
			    case "year":
				    if(arr[2] != "" && arr[3] != "") {
                        int dif = Convert.ToInt32(arr[2]) - Convert.ToInt32(DateTime.Parse(ev.start_date).DayOfWeek);
					    if(dif > 0) { dif -= 7; }

					    day = (7*Convert.ToInt32(arr[3])) + dif + 1;

                        dayString = day.ToString();
                        if (day < 10) { dayString = "0" + dayString; }

                        return DateTime.Parse(ev.start_date).ToString("yyyyMM") + dayString + "T" + DateTime.Parse(ev.start_date).ToString("HHmmss");
				    }
				    else {
                        return DateTime.Parse(ev.start_date).ToString(d.format);
				    }
                default: return "";
				    
		    }
	    }

        public static string getEndTimeevent(CalendarBasicModel ev)
        {
		    string s = getStartTimeevent(ev);
            string start_date = String.Format("{0}-{1}-{2}T{3}:{4}:{5}", s.Substring(0, 4), s.Substring(4, 2), s.Substring(6, 2), s.Substring(9, 2), s.Substring(11, 2), s.Substring(13, 2));
		    string end_date = DateTime.Parse(start_date).AddSeconds(ev.event_length).ToString(d.format);
            return end_date;
	    }


        public static void SendMeetingRequest(CalendarBasicModel c, List<KeyValuePair<string,string>> emailAddresses,string meetingType, string ssd)
        {
            string sender =  "shadow.kathare@gmail.com";//ConfigurationSettings.AppSettings["Sender"].ToString();
            string userName ="pullappa.boyapati@covalense.com"; //ConfigurationSettings.AppSettings["UserName"].ToString();
            string password ="Prem@123"; //ConfigurationSettings.AppSettings["Password"].ToString();
            string smtpURL = "smtp.sendgrid.net";//ConfigurationSettings.AppSettings["SmtpURL"].ToString();
            int smtpPort = 587;//ConfigurationSettings.AppSettings["Port"].ToString();

            try
            {
                
                MailMessage msg = new MailMessage();
                msg.From = new MailAddress(sender);
                foreach (KeyValuePair<string,string> email in emailAddresses)
                {
                    msg.To.Add(new MailAddress(email.Value, email.Key));
                }

                msg.Subject = meetingType + " Invitation";
                msg.Body = c.text;

                System.Net.Mime.ContentType ct = new System.Net.Mime.ContentType("text/calendar");
                ct.Parameters.Add("method", "REQUEST");
                ct.Parameters.Add("name", "Meeting.ics");

                StringBuilder str = new StringBuilder();
                str.AppendLine("BEGIN:VCALENDAR");
                str.AppendLine("PRODID:-//Microsoft Corporation//Outlook 14.0 MIMEDIR//EN");
                str.AppendLine("VERSION:2.0");
                str.AppendLine("METHOD:REQUEST");

                TimeZoneInfo localZone = TimeZoneInfo.Local;
                str.AppendLine("BEGIN:VTIMEZONE");
                str.AppendLine(string.Format("TZID:{0}", localZone.Id));
                //str.AppendLine("BEGIN:STANDARD");
                //str.AppendLine("DTSTART:16010101T000000");
                //str.AppendLine("TZOFFSETFROM:+0530");
                //str.AppendLine("TZOFFSETTO:+0530");
                //str.AppendLine("END:STANDARD");
                str.AppendLine("END:VTIMEZONE");
                str.AppendLine("BEGIN:VEVENT");

                if (c.event_pid != 0 && c.rec_type == "")
                {
                    str.AppendLine("DTSTART:" + DateTime.Parse(c.start_date).ToString(d.format) );
                    str.AppendLine("DTEND:" + DateTime.Parse(c.end_date).ToString(d.format) );
                    str.AppendLine("RECURRENCE-ID:" + UnixTimeStampToDateTime(c.event_length).ToString(d.format));
                   // str.AppendLine("RECURRENCE-ID:" + DateTime.Parse(c.end_date).ToString(d.format));//UnixTimeStampToDateTime(c.event_length).ToString(d.format));
                    str.AppendLine("UID:" + c.event_pid );
                   // DateTime.Parse(
                }
                else if (c.rec_type != "" && c.event_pid == 0)
                {
                    str.AppendLine("DTSTART:" + getStartTimeevent(c));
                    str.AppendLine("DTEND:" + getEndTimeevent(c) );
                    str.AppendLine("RRULE:" + getRrule(c) );
                    string exdate = getExdate(c.id, c);
                    if (exdate != "0") { str.AppendLine("EXDATE:" + exdate ); }
                    str.AppendLine("UID:" + c.id );
                }
                else if (c.rec_type == "" && c.event_pid == 0)
                {
                    str.AppendLine("DTSTART:" + DateTime.Parse(c.start_date).ToString(d.format));
                    str.AppendLine("DTEND:" + DateTime.Parse(c.end_date).ToString(d.format));
                    str.AppendLine("UID:" + c.id );
                }
                //   str.AppendLine(string.Format("DTSTAMP:{0:yyyyMMddTHHmmssZ}", DateTime.UtcNow));
                // str.AppendLine("When: " + string.Format("DTSTART:{0:yyyyMMddTHHmmssZ}", DateTime.Parse(dtStartDate.ToString(), null, DateTimeStyles.AdjustToUniversal) + string.Format("DTEND:{0:yyyyMMddTHHmmssZ}", DateTime.Parse(dtEndDate.ToString(), null, DateTimeStyles.AdjustToUniversal))));
                str.AppendLine("LOCATION: " + "Static Content");
                str.AppendLine(string.Format("DESCRIPTION:{0}", msg.Body));
                str.AppendLine(string.Format("X-ALT-DESC;FMTTYPE=text/html:{0}", msg.Body));
                str.AppendLine(string.Format("SUMMARY:{0}", msg.Subject));
                str.AppendLine(string.Format("ORGANIZER:MAILTO:{0}", msg.From.Address));

                str.AppendLine(string.Format("ATTENDEE;CN=\"{0}\";RSVP=TRUE:mailto:{1}", msg.To[0].DisplayName, msg.To[0].Address));

                str.AppendLine("BEGIN:VALARM");
                str.AppendLine("TRIGGER:-PT15M");
                str.AppendLine("ACTION:DISPLAY");
                str.AppendLine("DESCRIPTION:Reminder");
                str.AppendLine("END:VALARM");
                str.AppendLine("END:VEVENT");
                str.AppendLine("END:VCALENDAR");

                // AlternateView htmlView = AlternateView.CreateAlternateViewFromString(str.ToString(), new System.Net.Mime.ContentType("text/html; method=request; charset=UTF-8;component=vevent"));
                AlternateView avCal = AlternateView.CreateAlternateViewFromString(str.ToString(), ct);
                msg.AlternateViews.Add(avCal);
                // msg.AlternateViews.Add(htmlView);
                SmtpClient clt = new SmtpClient(smtpURL);
                clt.Port = smtpPort;
                clt.Credentials = new System.Net.NetworkCredential(userName, password);
                clt.EnableSsl = true;
                msg.IsBodyHtml = true;
                msg.BodyEncoding = Encoding.UTF8;
             //   System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate(object s, X509Certificate certificate, X509Chain chain, System.Net.Security.SslPolicyErrors sslPolicyErrors) { return true; };

                clt.Send(msg);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}