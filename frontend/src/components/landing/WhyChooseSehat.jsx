import { motion } from "framer-motion";
import { Calendar, Clock, Users, CheckCircle, Star, Heart } from "lucide-react";

const WhyChooseSehat = () => {
  return (
    <section id="features" className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Why Choose Sehat?
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Everything you need for seamless healthcare management
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto space-y-12">
          {/* Feature 1: Quick Appointment Booking - Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            {/* Feature Card */}
            <div className="group bg-white p-6 rounded-xl border-2 border-blue-500 hover:shadow-2xl transition-all relative overflow-hidden">

              <div className="inline-block mb-3">
                <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  FEATURED
                </span>
              </div>
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 relative z-10">
                <Calendar className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#1e3a5f] mb-2 relative z-10">
                Quick Appointment Booking
              </h3>
              <p className="text-sm text-gray-600 mb-4 relative z-10">
                Book appointments with verified doctors in seconds
              </p>
              <div className="space-y-2 relative z-10">
                <div className="flex items-start gap-2">
                  <CheckCircle
                    className="text-emerald-600 mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <span className="text-sm text-[#1e3a5f]">
                    View real-time doctor availability
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    className="text-emerald-600 mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <span className="text-sm text-[#1e3a5f]">
                    Instant booking confirmation
                  </span>
                </div>
              </div>
            </div>

            {/* Example UI Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-[#1e3a5f]">
                  Quick Appointment Booking
                </h4>
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  FEATURED
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Book appointments with top doctors in real-time
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-3">
                <p className="text-xs text-gray-500 mb-2">
                  Your Upcoming Appointments
                </p>
                <div className="bg-white p-3 rounded-lg border border-gray-200 mb-3">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Next Appointment
                      </p>
                      <p className="text-sm font-bold text-[#1e3a5f]">
                        Dr. Amit Verma - Cardiologist
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Tomorrow at 10:00 AM • City Hospital
                      </p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded">
                      Confirmed
                    </span>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Follow-up</p>
                      <p className="text-sm font-bold text-[#1e3a5f]">
                        Dr. Sneha Patel - Dermatologist
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Mar 15 at 2:00 PM • Wellness Clinic
                      </p>
                    </div>
                    <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-1 rounded">
                      Pending
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Calendar size={14} />
                    <p className="text-xs font-semibold">Total Visits</p>
                  </div>
                  <p className="text-xl font-bold text-[#1e3a5f]">12</p>
                  <p className="text-xs text-gray-500">This year</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Clock size={14} />
                    <p className="text-xs font-semibold">Avg Wait Time</p>
                  </div>
                  <p className="text-xl font-bold text-[#1e3a5f]">5m</p>
                  <p className="text-xs text-gray-500">At clinic</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 2: Verified Specialists - Right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            {/* Example UI Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg order-2 md:order-1">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-[#1e3a5f]">
                  Browse Verified Specialists
                </h4>
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  FEATURED
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Connect with top-rated doctors across all specialties
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-3">
                <p className="text-xs text-gray-500 mb-2">
                  Available Doctors Near You
                </p>

                <div className="bg-white p-3 rounded-lg border border-gray-200 mb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Cardiology</p>
                      <p className="text-sm font-bold text-[#1e3a5f]">
                        Dr. Amit Verma, MD
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star
                          className="text-amber-500 fill-amber-500"
                          size={12}
                        />
                        <span className="text-xs text-gray-600">
                          4.9 (250 reviews) • 20+ years exp.
                        </span>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded">
                      Available
                    </span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200 mb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Dermatology</p>
                      <p className="text-sm font-bold text-[#1e3a5f]">
                        Dr. Sneha Patel, MBBS
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star
                          className="text-amber-500 fill-amber-500"
                          size={12}
                        />
                        <span className="text-xs text-gray-600">
                          4.8 (180 reviews) • 15+ years exp.
                        </span>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded">
                      Available
                    </span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Orthopedics</p>
                      <p className="text-sm font-bold text-[#1e3a5f]">
                        Dr. Rahul Sharma, MS
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star
                          className="text-amber-500 fill-amber-500"
                          size={12}
                        />
                        <span className="text-xs text-gray-600">
                          4.7 (145 reviews) • 12+ years exp.
                        </span>
                      </div>
                    </div>
                    <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-1 rounded">
                      Busy
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Users size={14} />
                    <p className="text-xs font-semibold">Doctors</p>
                  </div>
                  <p className="text-xl font-bold text-[#1e3a5f]">500+</p>
                  <p className="text-xs text-gray-500">Verified specialists</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Star size={14} />
                    <p className="text-xs font-semibold">Avg Rating</p>
                  </div>
                  <p className="text-xl font-bold text-[#1e3a5f]">4.8</p>
                  <p className="text-xs text-gray-500">Patient reviews</p>
                </div>
              </div>
            </div>

            {/* Feature Card */}
            <div className="group bg-white p-6 rounded-xl border-2 border-blue-500 hover:shadow-2xl transition-all relative overflow-hidden order-1 md:order-2">

              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 relative z-10">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#1e3a5f] mb-2 relative z-10">
                Verified Specialists
              </h3>
              <p className="text-sm text-gray-600 mb-4 relative z-10">
                Access top healthcare professionals across specialties
              </p>
              <div className="space-y-2 relative z-10">
                <div className="flex items-start gap-2">
                  <CheckCircle
                    className="text-emerald-600 mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <span className="text-sm text-[#1e3a5f]">
                    500+ qualified doctors
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    className="text-emerald-600 mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <span className="text-sm text-[#1e3a5f]">
                    Read verified patient reviews
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 3: Smart Reminders - Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            {/* Feature Card */}
            <div className="group bg-white p-6 rounded-xl border-2 border-blue-500 hover:shadow-2xl transition-all relative overflow-hidden">

              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4 relative z-10">
                <Clock className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#1e3a5f] mb-2 relative z-10">
                Smart Reminders
              </h3>
              <p className="text-sm text-gray-600 mb-4 relative z-10">
                Never miss an appointment with automated alerts
              </p>
              <div className="space-y-2 relative z-10">
                <div className="flex items-start gap-2">
                  <CheckCircle
                    className="text-emerald-600 mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <span className="text-sm text-[#1e3a5f]">
                    SMS and Email notifications
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle
                    className="text-emerald-600 mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <span className="text-sm text-[#1e3a5f]">
                    Prescription reminders
                  </span>
                </div>
              </div>
            </div>

            {/* Example UI Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-[#1e3a5f]">
                  Smart Reminder System
                </h4>
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  FEATURED
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Never miss an appointment with automated notifications
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-3">
                <p className="text-xs text-gray-500 mb-2">Active Reminders</p>

                <div className="bg-white p-3 rounded-lg border border-gray-200 mb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <p className="text-xs text-gray-500">
                          Appointment Tomorrow
                        </p>
                      </div>
                      <p className="text-sm font-bold text-[#1e3a5f]">
                        Dr. Amit Verma - Cardiologist
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Reminder sent via SMS & Email
                      </p>
                    </div>
                    <Clock className="text-emerald-600" size={16} />
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200 mb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <p className="text-xs text-gray-500">
                          Follow-up Reminder
                        </p>
                      </div>
                      <p className="text-sm font-bold text-[#1e3a5f]">
                        Dr. Sneha Patel - Dermatologist
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Scheduled for Mar 14
                      </p>
                    </div>
                    <Clock className="text-blue-600" size={16} />
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <p className="text-xs text-gray-500">
                          Medication Reminder
                        </p>
                      </div>
                      <p className="text-sm font-bold text-[#1e3a5f]">
                        Take prescribed medication
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Daily at 9:00 AM & 9:00 PM
                      </p>
                    </div>
                    <Heart className="text-purple-600" size={16} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Clock size={14} />
                    <p className="text-xs font-semibold">Reminders</p>
                  </div>
                  <p className="text-xl font-bold text-[#1e3a5f]">86</p>
                  <p className="text-xs text-gray-500">This month</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <CheckCircle size={14} />
                    <p className="text-xs font-semibold">Success Rate</p>
                  </div>
                  <p className="text-xl font-bold text-[#1e3a5f]">98%</p>
                  <p className="text-xs text-gray-500">Kept appointments</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSehat;
