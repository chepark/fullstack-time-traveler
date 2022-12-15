import mysql.connector

try:
    connection = mysql.connector.connect(host='127.0.0.1',
                                         port=3306,
                                         database='flight_game',
                                         user='root',
                                         password='1111')

    cursor = connection.cursor()
    sql_update_query = "Update airport set name = %s where ident = %s"

    # multiple records to be updated in tuple forma
    records_to_update = [("Düsseldorf International Airport", "EDDL"), ("Tromsø Airport", "ENTC"),
                         ("Trondheim Airport, Værnes", "ENVA"),
                         ("John Paul II Kraków-Balice Airport", "EPKK"),
                         ("César Manrique-Lanzarote Airport", "GCRR"), ("Nouakchott Oumtounsy Airport", "GQNO"),
                         ("Amílcar Cabral International Airport", "GVAC"),
                         ("Minneapolis Saint Paul Airport", "KMSP"),
                         ("Alicante Elche Miguel Hernández Airport", "LEAL"),
                         ("Adolfo Suárez Madrid–Barajas Airport", "LEMD"),
                         ("Málaga-Costa del Sol Airport", "LEMG"), ("Santiago Rosalía de Castro Airport", "LEST"),
                         ("Bordeaux–Mérignac Airport", "LFBD"),
                         ("Nice Côte d'Azur Airport", "LFMN"), ("Falcone Borsellino Airport", "LICJ"),
                         ("Leonardo da Vinci International Airport", "LIRF"), ("Ljubljana Joze Pucnik Airport", "LJLJ"),
                         ("Václav Havel Airport Prague", "LKPR"), ("João Paulo II Airport", "LPPD"),
                         ("Francisco Sá Carneiro Airport", "LPPR"), ("Zurich Airport", "LSZH"),
                         ("Istanbul Atatürk Airport", "LTBA"), ("Istanbul Sabiha Gökçen International", "LTFJ"),
                         ("Bratislava Airport", "LZIB"), ("Las Américas International Airport", "MDSD"),
                         ("Licenciado Gustavo Díaz Ordaz Airport", "MMPR"),
                         ("Santa Lucia Air Force Base", "MMSM"),
                         ("General Abelardo L. Rodríguez Airport", "MMTJ"),
                         ("Cancun International Airport", "MMUN"),
                         ("Monseñor Óscar Arnulfo Romero Airport", "MSLP"),
                         ("José Martí International Airport", "MUHA"),
                         ("Nouméa Magenta Airport", "NWWM"), ("Val de Cans International Airport", "SBBE"),
                         ("Hercílio Luz International Airport", "SBFL"),
                         ("RIOgaleão Tom Jobim Airport", "SBGL"),
                         ("Guarulhos International Airport", "SBGR"),
                         ("Deputado Luís Eduardo Magalhães Airport", "SBSV"),
                         ("Arturo Merino Benítez Airport", "SCEL"),
                         ("José Joaquín de Olmedo Airport", "SEGU"),
                         ("Cayenne Félix Eboué Airport ", "SOCA"), ("Jorge Chávez International Airport", "SPIM"),
                         ("General José Antonio Anzoátegui Airport", "SVBC"),
                         ("Simón Bolívar International Airport", "SVMI"),
                         ("Martinique Aimé Césaire Airport", "TFFF"),
                         ("Velana International Airport", "VRMM"), ("Ürümqi Diwopu International Airport ", "ZWWW")]

    cursor.executemany(sql_update_query, records_to_update)
    connection.commit()

    print(cursor.rowcount, "Records of airport names updated successfully")

except mysql.connector.Error as error:
    print("Failed to update records to database: {}".format(error))
finally:
    if connection.is_connected():
        connection.close()
        print("MySQL connection is closed")