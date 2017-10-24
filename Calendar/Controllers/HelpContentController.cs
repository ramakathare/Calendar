using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Calendar.Controllers
{
    public class HelpContentController : Controller
    {
        //
        // GET: /HelpContent/

        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /HelpContent/Details/5

        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /HelpContent/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /HelpContent/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /HelpContent/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /HelpContent/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /HelpContent/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /HelpContent/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
