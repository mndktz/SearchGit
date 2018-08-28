using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GitSearch.Controllers
{
    
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        //get bookmarks
        [HttpGet]
        public ActionResult Bookmarks()
        {
            if (this.Session["Bookmars"] == null)
            {
                this.Session["Bookmars"] = new List<Repo>();
            }
            var list = this.Session["Bookmars"] as List<Repo>;
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        //save bookmarks
        [HttpPost]
        public ActionResult Bookmark(Repo repo)
        {
            if (this.Session["Bookmars"] == null)
            {
                this.Session["Bookmars"] = new List<Repo>();
            }
            var list = this.Session["Bookmars"] as List<Repo>;
            if (repo.Add)
            {
                list.Add(repo);
            }
            else {
                var itemToRemove = list.Single(r => r.Avatar == repo.Avatar && r.Name == repo.Name);
                list.Remove(itemToRemove);
            }
            this.Session["Bookmars"] = list;
            return new EmptyResult();
        }
    }
}