using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;
using System.Data;
using Calendar.Models;
using Calendar.Data;
using iTextSharp.text;
using System.IO;
using iTextSharp.text.pdf;
using System.Text;
using iTextSharp.tool.xml;

//using Calendar.Data;

namespace Calendar.Controllers
{
    public class HomeController : Controller
    {
        string connectionString = "Data Source=Localhost\\SQLEXPRESS;Initial Catalog=CalendarEvents;Integrated Security=True;Pooling=False";

        CalendarEventsEntities db = new CalendarEventsEntities();

        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        [HttpPost]
        public ActionResult sendEmail(CalendarBasicModel c, string ssd)
        {
            try
            {
                List<KeyValuePair<string,string>> emailAddresses = new List<KeyValuePair<string,string>>();
                string meetingType = "";
                CalendarBasicModel ev = new CalendarBasicModel();

                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = connection.CreateCommand())
                    {
                        command.CommandText = "SELECT email,name FROM Users where id in (" + c.attendees + ")";
                        command.CommandType = CommandType.Text;
                        try
                        {
                            connection.Open();
                            using (SqlDataReader reader = command.ExecuteReader())
                            {
                                emailAddresses = reader.Select(r=>
                                                        new KeyValuePair<string, string>(Convert.ToString(r["name"]), Convert.ToString(r["email"]))).ToList();
                            }
                            command.CommandText = "SELECT type FROM MeetingType where id=" + c.type;
                            command.CommandType = CommandType.Text;
                            using (SqlDataReader reader = command.ExecuteReader())
                            {
                                meetingType = reader.Select(r =>
                                                         Convert.ToString(r["type"])).FirstOrDefault();
                            }
                            command.CommandText = "SELECT * FROM CalendarEvents where id=" + c.id;
                            command.CommandType = CommandType.Text;
                            using (SqlDataReader reader = command.ExecuteReader())
                            {
                                //while (reader.Read())
                                //{
                                ev = reader.Select(r =>
                                                    new CalendarBasicModel
                                                    {
                                                        id = r["id"] is DBNull ? 0 : Convert.ToInt64(r["id"]),
                                                        text = r["text"] is DBNull ? "" : r["text"].ToString(),
                                                        start_date = r["start_date"] is DBNull ? DateTime.Now.ToString() : Convert.ToDateTime(r["start_date"]).ToString(),
                                                        end_date = r["end_date"] is DBNull ? DateTime.Now.ToString() : Convert.ToDateTime(r["end_date"]).ToString(),
                                                        type = r["type"] is DBNull ? 0 : Convert.ToInt32(r["type"]),
                                                        rec_pattern = r["rec_pattern"] is DBNull ? "" : r["rec_pattern"].ToString(),
                                                        rec_type = r["rec_type"] is DBNull ? "" : r["rec_type"].ToString(),
                                                        event_pid = r["event_pid"] is DBNull ? 0 : Convert.ToInt64(r["event_pid"]),
                                                        event_length = r["event_length"] is DBNull ? 0 : Convert.ToInt64(r["event_length"]),
                                                        attendees = r["attendees"] is DBNull ? "" : Convert.ToString(r["attendees"]),
                                                        description = r["description"] is DBNull ? "" : Convert.ToString(r["description"]),
                                                        saved2DB = true
                                                    }).FirstOrDefault();
                                //}
                            }
                        }
                        finally
                        {
                            try
                            {
                                if (connection.State == ConnectionState.Open)
                                    connection.Close();
                            }
                            catch
                            {

                            }
                        }
                    }
                }
                Helpers.SendMeetingRequest(ev, emailAddresses, meetingType, ssd);
                return Json(new { success = true, i = 1 }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, i = 0 }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult ShowEventEditor(CalendarEvent c)
        {
           
            
            if (db.CalendarEvents.Any(p => p.id.Equals(c.id)))
            {
                Session["oper"] = "edit";
                Session["oldId"] = "0";
                return PartialView(c);
            }
            else
            {
                Session["oper"] = "add";
                Session["oldId"] = c.id;
                return PartialView(c);
            }
        }

        [HttpPost]
        public ActionResult SubmitEvent(CalendarEvent c)
        {

            string oldId = Convert.ToString(Session["oldId"]);
            string op = Convert.ToString(Session["oper"]);
            try
            {
                if (op.IndexOf("edit")>=0)
                {
                    db.Entry(c).State = EntityState.Modified;
                    db.SaveChanges();
                }
                else if (op.IndexOf("add") >= 0)
                {
                    db.CalendarEvents.Add(c);
                    db.SaveChanges();
                }

                CalendarBasicModel calendarBasicModel = new CalendarBasicModel
                                                {
                                                    id = c.id,
                                                    text = c.text.ToString(),
                                                    start_date = c.start_date.ToString("yyyy-MM-dd HH:mm"),
                                                    end_date = c.end_date.ToString("yyyy-MM-dd HH:mm"),
                                                    type = Convert.ToInt32(c.type),
                                                    rec_pattern = c.rec_pattern == null ? "" : Convert.ToString(c.rec_pattern),
                                                    rec_type = c.rec_type == null ? "" : Convert.ToString(c.rec_type),
                                                    event_pid = Convert.ToInt64(c.event_pid),
                                                    event_length = Convert.ToInt64(c.event_length),
                                                    attendees = Convert.ToString(c.attendees),
                                                };

                var response = new
                {
                    ev = calendarBasicModel,
                    oldId = oldId,
                    op = op,
                    success = true
                };
                return Json(response, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                var response = new
                {
                    oldId = oldId,
                    op = op,
                    success = false
                };
                return Json(response, JsonRequestBehavior.AllowGet);
            }
           
        }

        [HttpPost]
        public ActionResult AddEvent(CalendarBasicModel c, string op)
        {
            //throw new Exception("hello");
            int i = 0;
            List<string> query = new List<string>();

            if (op.IndexOf("add") >= 0)
            {
                query.Add(@"Insert into CalendarEvents values ('" + c.text + "','Hyderabad','" + c.start_date + "','" + c.end_date + "'," + c.type + ",'"+c.description+"','" + c.rec_type + "'," + c.event_length + "," + c.event_pid + ",'" + c.rec_pattern + "','"+c.attendees+"',-1) ; SELECT CAST(scope_identity() AS int)");
            }
            else if (op.IndexOf("edit") >= 0 && c.id >0)
            {
                query.Add(@"Update CalendarEvents Set text='" + c.text + "',location='Hyderabad',start_date='" + c.start_date + "',end_date='" + c.end_date + "',type=" + c.type + ",description='"+c.description+"',rec_type='" + c.rec_type + "',event_length=" + c.event_length + ",event_pid=" + c.event_pid + ",rec_pattern='" + c.rec_pattern + "', attendees='" + c.attendees + "' where id=" + c.id);
                if (c.rec_type!=null && Convert.ToString(c.rec_type).Trim().Length > 0)
                    query.Add(@"Delete from CalendarEvents where event_pid=" + c.id);
            }
            else if (op.IndexOf("del") >= 0 && c.id >0)
            {
                if (c.event_pid > 0)
                {
                    query.Add(@"Update CalendarEvents Set rec_type='none', rec_pattern='none' where id=" + c.id);
                }
                else
                {
                    query.Add(@"Delete from CalendarEvents where id=" + c.id);
                }
                if (c.rec_type != null &&  Convert.ToString(c.rec_type).Trim().Length > 0)
                {
                    query.Add(@"Delete from CalendarEvents where event_pid=" + c.id);
                }
            }
                
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlTransaction transaction;

                connection.Open();
                transaction = connection.BeginTransaction();
                try
                {
                    foreach (string item in query)
                    {
                        if (op.IndexOf("add") >= 0)
                        {
                            //SqlParameter param = new SqlParameter("@id", SqlDbType.BigInt);
                            //param.Direction = ParameterDirection.Output;
                            //SqlCommand cmd = new SqlCommand(item, connection, transaction);
                            //cmd.Parameters.Add(param);
                            i = (int)new SqlCommand(item, connection, transaction).ExecuteScalar();
                        }else{
                            new SqlCommand(item, connection, transaction).ExecuteNonQuery();
                        }
                    }
                    transaction.Commit();
                    return Json(new { success = true, i = i}, JsonRequestBehavior.AllowGet);
                }
                catch(SqlException sqlError)
                {
                    transaction.Rollback();
                }
                finally
                {
                    connection.Close();
                }
            }
            return Json(new { success = false, i = i }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult saveAgenda(int id, string bytes)
        {
            //throw new Exception("hello");
            int i = 0;
            List<string> query = new List<string>();

            query.Add(@"Update CalendarEvents Set agenda='" + bytes + "' where id=" + id);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlTransaction transaction;

                connection.Open();
                transaction = connection.BeginTransaction();
                try
                {
                    foreach (string item in query)
                    {
                        
                            new SqlCommand(item, connection, transaction).ExecuteNonQuery();
                    }
                    transaction.Commit();
                    return Json(new { success = true, i = i }, JsonRequestBehavior.AllowGet);
                }
                catch (SqlException sqlError)
                {
                    transaction.Rollback();
                }
                finally
                {
                    connection.Close();
                }
            }
            return Json(new { success = false, i = i }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult GetAgenda(string id)
        {
            int i = 0;
            string query = @"Select agenda from CalendarEvents where id=" + id;
            string respnse = "";
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = connection.CreateCommand())
                    {
                        command.CommandText = query;
                        command.CommandType = CommandType.Text;
                        connection.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                respnse = Convert.ToString(reader["agenda"] is DBNull ? "" : reader["agenda"]);
                            }
                        }
                    };
                };
                return Json(new { agenda = respnse, success = true, i = i }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { success = false, i = i }, JsonRequestBehavior.AllowGet);
            }
        }


        public FileResult AgendaToPdf(string id)
        {
           // GlobalObject.unescape();
           // GlobalObject.escape();

            int i = 0;
            string query = @"Select agenda from CalendarEvents where id=" + id;
            string respnse = "No Agenda";
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    using (SqlCommand command = connection.CreateCommand())
                    {
                        command.CommandText = query;
                        command.CommandType = CommandType.Text;
                        connection.Open();
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                respnse = Convert.ToString(reader["agenda"] is DBNull ? "" : reader["agenda"]);
                            }
                        }
                    };
                };

                //string[] response = respnse.Split(',');
                //byte[] bytes = new byte[response.Length];
                //int k = 0;
                //foreach (string item in response)
                //{
                //    bytes[k++] = Convert.ToByte(item);
                //}

               // return new FileContentResult(bytes, "application/pdf");

                return new FileContentResult(pdfBytes(respnse), "application/pdf");
            }
            catch (Exception ex)
            {
                byte[] printContent = GetBytes(respnse);
                return new FileContentResult(printContent, "application/pdf");
            }
        }

        [NonAction]
        public byte[] pdfBytes(string escapedString)
        {
            Document doc = null;
            try
            {
                doc = new Document(PageSize.A4);
                MemoryStream memStream = new MemoryStream();
                PdfWriter writer = PdfWriter.GetInstance(doc, memStream);
                writer.CloseStream = false;

                doc.Open();


                string html = "<html><body>";
                html+=Microsoft.JScript.GlobalObject.unescape(escapedString);
                html += "</body></html>";
              
                iTextSharp.text.html.simpleparser.HTMLWorker hw =
                             new iTextSharp.text.html.simpleparser.HTMLWorker(doc);

                hw.Parse(new StringReader(html));

                //Chunk chunk = new Chunk(html, FontFactory.GetFont("arial"));
                //chunk.Font.Size = 10;
                //Phrase p1 = new Phrase(chunk);
                //Paragraph p = new Paragraph(p1);
                //doc.Add(p);

                //StringReader str = new StringReader(html);

                //XMLWorkerHelper.GetInstance().ParseXHtml(writer, doc, str);

                if (doc.IsOpen()) doc.Close();

                return memStream.ToArray();
            }
            catch (Exception ex)
            {
                return Encoding.ASCII.GetBytes("Error Occured");
            }
            finally
            {
                if (doc.IsOpen()) doc.Close();
            }

        }

        [NonAction]
        public byte[] GetBytes(string str)
        {
            byte[] bytes = new byte[str.Length * sizeof(char)];
            System.Buffer.BlockCopy(str.ToCharArray(), 0, bytes, 0, bytes.Length);
            return bytes;
        }

        [NonAction]
        public string GetString(byte[] bytes)
        {
            char[] chars = new char[bytes.Length / sizeof(char)];
            System.Buffer.BlockCopy(bytes, 0, chars, 0, bytes.Length);
            return new string(chars);
        }

        public ActionResult GetCalendarData()
        {
            List<CalendarBasicModel> response = new List<CalendarBasicModel>();
            List<SelectObject> responseMeetingTypes = new List<SelectObject>();

            responseMeetingTypes.Add(new SelectObject { id = 0, label = "Select Meeting Type", value = "0" });

            List<SelectObject> responseAttendees = new List<SelectObject>();

            responseAttendees.Add(new SelectObject { id = 0, label = "", value = "0" });

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
               // connection.ConnectionString = connString;

                // This creates an object with which you can execute sql
                using (SqlCommand command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM CalendarEvents";
                    command.CommandType = CommandType.Text;
                    // If the SQL you want to execute is a stored procedure, use the commented 2 lines below
                    // instead of the 2 lines above.
                    // command.CommandText = "SP_GetTestSubjectCount_Select";
                    // command.CommandType = CommandType.StoredProcedure;

                    // This is how you add a parameter to your sql command
                    // This way you are protected against SQL injection attacks
                    //SqlParameter testIdParameter = command.CreateParameter();
                    //testIdParameter.ParameterName = "@TestId";
                    //testIdParameter.Value = "Some Value";
                    //command.Parameters.Add(testIdParameter);

                    try
                    {

                        connection.Open();

                        // This is the easiest way to iterate through the returned results with MULTIPLE rows
                        // This way can ONLY be used for SELECT statements or SPs which returns results
                        using(SqlDataReader reader = command.ExecuteReader()){
                        //while (reader.Read())
                        //{
                            response = reader.Select(r =>
                                                new CalendarBasicModel
                                                {
                                                    id = r["id"] is DBNull ? 0 : Convert.ToInt64(r["id"]),
                                                    text = r["text"] is DBNull ? "" : r["text"].ToString(),
                                                    start_date = r["start_date"] is DBNull ? DateTime.Now.ToString("yyyy-MM-dd HH:mm") : Convert.ToDateTime(r["start_date"]).ToString("yyyy-MM-dd HH:mm"),
                                                    end_date = r["end_date"] is DBNull ? DateTime.Now.ToString("yyyy-MM-dd HH:mm") : Convert.ToDateTime(r["end_date"]).ToString("yyyy-MM-dd HH:mm"),
                                                    type = r["type"] is DBNull ? 0 : Convert.ToInt32(r["type"]),
                                                    rec_pattern = r["rec_pattern"] is DBNull ? "" : r["rec_pattern"].ToString(),
                                                    rec_type = r["rec_type"] is DBNull ? "" : r["rec_type"].ToString(),
                                                    event_pid = r["event_pid"] is DBNull ? 0 : Convert.ToInt64(r["event_pid"]),
                                                    event_length = r["event_length"] is DBNull ? 0 : Convert.ToInt64(r["event_length"]),
                                                    attendees = r["attendees"] is DBNull ? "" : Convert.ToString(r["attendees"]),
                                                    description = r["description"] is DBNull ? "" : Convert.ToString(r["description"]),
                                                    saved2DB = true
                                                }).ToList();                                       
                        //}
                        }

                        command.CommandText = "SELECT * FROM MeetingType";
                        command.CommandType = CommandType.Text;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {

                            responseMeetingTypes.AddRange(reader.Select(r =>
                                                    new SelectObject
                                                    {
                                                        id = r["id"] is DBNull ? 0 : Convert.ToInt32(r["id"]),
                                                        value = r["id"] is DBNull ? null : r["id"].ToString(),
                                                        label = r["type"] is DBNull ? null : r["type"].ToString()
                                                    }).ToList());
                        }

                        command.CommandText = "SELECT * FROM Users";
                        command.CommandType = CommandType.Text;
                        using (SqlDataReader reader = command.ExecuteReader())
                        {

                            responseAttendees.AddRange(reader.Select(r =>
                                                    new SelectObject
                                                    {
                                                        id = r["id"] is DBNull ? 0 : Convert.ToInt32(r["id"]),
                                                        value = r["id"] is DBNull ? null : r["id"].ToString(),
                                                        label = r["name"] is DBNull ? null : r["name"].ToString()
                                                    }).ToList());
                        }

                        var responseData = new{
                            data = response,
                            collections = new{
                                type = responseMeetingTypes,
                                attendees = responseAttendees
                            }
                        };

                            return Json(responseData, JsonRequestBehavior.AllowGet);
                        // If your SQL returns just ONE VALUE you can use the code below
                       // int testObjectCount = (int)command.ExecuteScalar();

                        // For DELETE, UPDATE, INSERT statements which does not return a resultset
                        // instead they return the number of records affected
                        // Use the code below for that instead of the above code
                       // int affectedRows = command.ExecuteNonQuery();

                    }
                    finally
                    {
                        try
                        {
                            if (connection.State == ConnectionState.Open)
                                connection.Close();
                        }
                        catch
                        {
                            // This catch block suppresses any errors occured while closing the connection
                            // remove the try catch block if you want your application to know of this exception as well
                        }
                    }
                }

            }
            
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
