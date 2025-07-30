export default function HubungiKamiSection() {
  return (
    <section id="kontak" className="w-full bg-blue-900 border-b-red-500 ">
      <div className="max-w-5xl mx-auto bg-white text-gray-800 px-6 md:px-12 py-16 rounded shadow-lg overflow-hidden">
        {/* Garis atas */}
        <div className="w-full h-[1px] bg-gray-400 mb-16" />

        {/* Judul dan garis gradasi */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Hubungi Kami</h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-blue-500 to-red-500 mx-auto mb-6" />
        </div>

        {/* Grid Form + Map */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-3 rounded focus:outline-blue-500"
            />
            <textarea
              placeholder="Enter your message"
              rows={6}
              className="w-full border border-gray-300 p-3 rounded resize-none focus:outline-blue-500"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold"
            >
              Send Message
            </button>
          </form>

          {/* Map */}
          <div className="w-full h-[400px] rounded overflow-hidden shadow">
            <iframe
              title="Lokasi Dakota"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7931.49363173176!2d106.957817!3d-6.296965!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f12055555555%3A0x9433e0fc0a4de67c!2sDakota%20Cargo%20Pusat!5e0!3m2!1sid!2sus!4v1753620938865!5m2!1sid!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Garis bawah */}
        <div className="w-full h-[1px] bg-gray-400 mt-16" />
      </div>
    </section>
  );
}
