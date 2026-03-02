import Array "mo:core/Array";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type Appointment = {
    patientName : Text;
    email : Text;
    phone : Text;
    doctor : Text;
    department : Text;
    date : Text;
    timeSlot : Text;
  };

  var nextId : Nat = 0;

  let appointments = Map.empty<Nat, Appointment>();

  // Public booking form - guests can submit appointments (no auth check needed)
  public shared ({ caller }) func submitAppointment(appointment : Appointment) : async Nat {
    let id = nextId;
    nextId += 1;
    appointments.add(id, appointment);
    id;
  };

  // Admin-only: viewing all appointments contains sensitive patient data
  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all appointments");
    };
    appointments.values().toArray();
  };

  // Anyone can look up appointments by email (public booking system)
  public query ({ caller }) func getAppointmentsByEmail(email : Text) : async ?[Appointment] {
    let filtered = appointments.values().toArray().filter(
      func(appointment) {
        appointment.email == email;
      }
    );

    if (filtered.size() > 0) {
      ?filtered;
    } else {
      null;
    };
  };
};
