from django.urls import path
from . import views


urlpatterns = [

    path('internships/<int:pg>/', 						views.Internships,
         name='internships'),
    path('my-internships/',                     views.MyInternships,
         name='my-internships'),
    path('internships/create/',
         views.InternshipCreateView,             name='internship-create'),
    path('internships/<int:pk>/detial',
         views.InternshipDetailView,             name='internship-detail'),
    path('internships/<int:pk>/application/',
         views.InternshipApplicationView,        name='internship-application'),
    path('internships/<int:pk>/update/',
         views.InternshipUpdateView,             name='internship-update'),
    path('internships/<int:pk>/delete/',
         views.InternshipDeleteView,             name='internship-delete'),
    path('venture-capitalist/', 				views.VenCapitalist,
         name='venture-capitalist'),
    path('venture-capitalist/create/',
         views.VenCapCreateView,                 name='vencap-create'),
    path('venture-capitalist/<int:pk>/update/',
         views.VenCapUpdateView,                 name='vencap-update'),
    path('venture-capitalist/<int:pk>/delete/',
         views.VenCapDeleteView,                 name='vencap-delete'),
    path('download/<int:pk>/',                  views.exceldownload,
         name='excel-download'),

]
