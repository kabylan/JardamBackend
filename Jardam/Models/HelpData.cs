using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jardam.Models
{
    public class HelpData
    {
        public int Id { get; set; }

        public DateTime CreateDateTime { get; set; }

        public string Lat { get; set; }

        public string Long { get; set; }

        public string UserID { get; set; }
    }
}
